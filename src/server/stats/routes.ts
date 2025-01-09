import { createRoute } from '@hono/zod-openapi';

import {
    createServerErrorResponse,
    createSuccessResponse,
    createValidatorErrorResponse,
} from '../common/utils';
import { postPaginateRequestQuerySchema, postPaginateResponseSchema } from './schema';

export const postTags = ['文章操作'];

export const postRoutes = {
    paginateRoute: createRoute({
        tags: postTags,
        method: 'get',
        summary: '文章分页查询',
        path: '/',
        request: {
            query: postPaginateRequestQuerySchema,
        },
        responses: {
            ...createSuccessResponse('文章分页查询数据', postPaginateResponseSchema),
            ...createValidatorErrorResponse(),
            ...createServerErrorResponse('查询文章分页数据失败'),
        },
    }),
};
