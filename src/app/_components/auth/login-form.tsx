'use client';

import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import { checkAccessToken } from '@/libs/token';
import { isNil } from 'lodash';
import { Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '../shadcn/ui/button';
import { Checkbox } from '../shadcn/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../shadcn/ui/form';
import { Input } from '../shadcn/ui/input';
import { useAuthLoginForm, useAuthLoginSubmitHandler } from './hooks';
import styles from './style.module.css';

export const AuthLoginForm: FC = () => {
    const router = useRouter();
    const form = useAuthLoginForm();
    const [authEror, setAuthError] = useState<string | null>(null);
    const submitHandler = useAuthLoginSubmitHandler(setAuthError);
    useEffect(() => {
        (async () => {
            const auth = await checkAccessToken();
            if (!isNil(auth)) router.replace('/');
        })();
    }, []);
    return (
        <div className="tw-flex tw-min-h-screen tw-w-full tw-items-center tw-justify-center tw-p-4">
            <div className="tw-w-full tw-max-w-md">
                <div className={cn('tw-rounded-2xl tw-p-6 md:tw-p-8', styles.glassEffect)}>
                    <div className="tw-mb-8 tw-text-center">
                        <h1 className="tw-mb-2 tw-text-2xl tw-font-bold md:tw-text-3xl">
                            欢迎回来
                        </h1>
                        <p className="tw-text-muted-foreground">登录您的账号</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submitHandler)} className="tw-space-y-6">
                            {authEror && (
                                <div
                                    className={cn(
                                        'tw-p-3 tw-rounded-md',
                                        'tw-bg-destructive/10 tw-border tw-border-destructive/20',
                                        'tw-text-sm tw-text-destructive',
                                    )}
                                >
                                    {authEror}
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="credential"
                                render={({ field }) => (
                                    <FormItem className="tw-space-y-2">
                                        <label htmlFor="credential" className="tw-text-sm">
                                            用户名
                                        </label>
                                        <FormControl>
                                            <div className="tw-relative">
                                                <User className="tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
                                                <Input
                                                    {...field}
                                                    id="credential"
                                                    className="tw-pl-10"
                                                    placeholder="请输入用户名"
                                                    disabled={form.formState.isSubmitting}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="tw-space-y-2">
                                        <label htmlFor="password" className="tw-text-sm">
                                            密码
                                        </label>
                                        <FormControl>
                                            <div className="tw-relative">
                                                <Lock className="tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-muted-foreground" />
                                                <Input
                                                    {...field}
                                                    id="password"
                                                    type="password"
                                                    className="tw-pl-10"
                                                    disabled={form.formState.isSubmitting}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="tw-flex tw-items-center tw-justify-between">
                                <div className="tw-flex tw-items-center tw-space-x-2">
                                    <Checkbox id="remember" />
                                    <label
                                        htmlFor="remember"
                                        className="tw-text-sm tw-text-muted-foreground"
                                    >
                                        记住我
                                    </label>
                                </div>
                                <Button
                                    variant="link"
                                    className="tw-text-sm tw-text-muted-foreground hover:tw-text-foreground"
                                >
                                    忘记密码？
                                </Button>
                            </div>

                            <Button
                                type="submit"
                                className="tw-w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? '登录中...' : '登录'}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
