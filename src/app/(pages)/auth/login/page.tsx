import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { AuthLoginForm } from '@/app/_components/auth/login-form';

export const generateMetadata = async (_: any, parent: ResolvingMetadata): Promise<Metadata> => {
    return {
        title: `登录 - 影视管理站`,
        description: '专业的影视管理平台',
    };
};

const AuthLoginPage: FC = async () => {
    return (
        <div className="tw-min-h-screen">
            <AuthLoginForm />
        </div>
    );
};
export default AuthLoginPage;
