import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { Context, Next } from 'hono';

import { authConfig } from '@/config/auth';
import { getAccessTokenFromHeader } from '@/libs/token';
import jwt from 'jsonwebtoken';
import { isNil } from 'lodash';
import { Passport } from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import type { AuthItem } from './types';

import { createErrorResult } from '../common/utils';
import { validateUser } from './service';
// 存储在redis中的令牌黑名单键名称
const BLACKLIST_KEY = 'token:blacklist';
const passport = new Passport();
/**
 * 初始化passport中间件
 */
const passportInitialize = () => async (c: Context, next: Next) => {
    const handler = passport.initialize();
    await new Promise((resolve) => {
        handler(c.req.raw as any, (c.res as any).raw, resolve as any);
    });
    await next();
};

/**
 * 添加本地用户认证策略
 */
passport.use(
    'local',
    new LocalStrategy({ usernameField: 'credential' }, async (credential, password, done) => {
        try {
            const user = await validateUser(credential, password);
            if (typeof user === 'boolean' && !user) done({ message: '密码错误', code: 401 });
            if (isNil(user)) done({ message: '用户不存在', code: 401 });
            done(null, user as any);
        } catch (error) {
            done(error);
        }
    }),
);

/**
 * 添加jwt验证策略
 */
passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: getAccessTokenFromHeader,
            secretOrKey: authConfig.jwtSecret,
        },
        async (jwtPayload: AuthItem, done: any) => {
            try {
                return done(null, jwtPayload);
            } catch (error) {
                return done(error, false);
            }
        },
    ),
);

/**
 * 验证jwt token的有效性
 * @param c 上下文
 */
const verifyJWT = async (c: Context) =>
    new Promise<boolean>((resolve) => {
        passport.authenticate('jwt', { session: false }, async (err: any, user: AuthItem) => {
            if (err || !user) {
                resolve(false);
                return;
            }
            const token = getAccessTokenFromHeader(c.req.raw as any);
            // 将用户信息添加到请求中，供后续api处理器使用
            (c.req as any).user = user;
            resolve(true);
        })(c.req.raw, (c.res as any).raw);
    });

/**
 * 路由JWT验证保护处理器
 * @param handler
 */
const createAuthenticatedHandler = <R extends RouteConfig>(
    handler: RouteHandler<R>,
): RouteHandler<R> =>
    (async (c: Parameters<RouteHandler<R>>[0], next: Next) => {
        try {
            const isAuthenticated = await verifyJWT(c);
            if (!isAuthenticated) return c.json(createErrorResult('用户未认证'), 401);
            return await handler(c, next);
        } catch (error) {
            return c.json(createErrorResult(error as any), 500);
        }
    }) as any;
export { createAuthenticatedHandler, passport, passportInitialize, verifyJWT };
