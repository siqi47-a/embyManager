'use client';

import type { FC } from 'react';

import { useScroll } from '@/libs/broswer';

import { HeaderNav } from './nav';
import { HeaderUser } from './user';

export const Header: FC = () => {
    const scrolled = useScroll(50);

    return (
        <div className="min-h-screen">
            {/* Desktop Navigation */}
            <HeaderNav scrolled={scrolled} />
            {/* User Menu */}
            <HeaderUser scrolled={scrolled} />
        </div>
    );
};
