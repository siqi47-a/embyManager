import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import './styles/index.css';
import './styles/prism.css';

export const metadata: Metadata = {
    title: 'nextapp',
    description: 'Emby影视库管理',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body>{children}</body>
    </html>
);

export default RootLayout;
