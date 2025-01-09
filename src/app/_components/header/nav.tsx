import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import { Code, Lock, LogIn, MessageCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { NavigationMenu, NavigationMenuList } from '../shadcn/ui/navigation-menu';
import $styles from './nav.module.css';

export const HeaderNav: FC<{ scrolled: boolean; isLoggedIn?: boolean }> = ({
    scrolled,
    isLoggedIn = false,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isChangelogOpen, setIsChangelogOpen] = useState(false);

    const items = [
        {
            title: 'GitHub',
            href: 'https://github.com/RandallAnjie/EmbyController',
            external: true,
            icon: Code,
        },
        {
            title: 'Telegram群组',
            href: 'https://t.me',
            external: true,
            icon: MessageCircle,
        },
        { title: '站点日志', href: '#', onClick: true, icon: Lock },
        ...(isLoggedIn
            ? [{ title: '回到控制台', href: '/media/user/index', auth: true, icon: LogIn }]
            : [
                  { title: '登录', href: '/media/user/login', auth: false, icon: LogIn },
                  { title: '注册', href: '/media/user/register', auth: false, icon: UserPlus },
              ]),
    ];

    return (
        <nav className={$styles.nav}>
            <div className={$styles.menus}>
                {/* 网站标题 */}
                <Link href="/media" className="tw-text-xl tw-font-bold md:tw-text-2xl">
                    影视管理站
                </Link>

                {/* 移动端菜单按钮 */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* 桌面端导航 */}
                <NavigationMenu className="tw-hidden tw-items-center tw-space-x-8 md:tw-flex">
                    <NavigationMenuList>
                        {items.map((item) => {
                            if (item.auth === true && !isLoggedIn) return null;
                            if (item.auth === false && isLoggedIn) return null;

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="tw-flex tw-items-center tw-space-x-2 tw-transition-colors hover:tw-text-white/80"
                                    {...(item.external ? { target: '_blank' } : {})}
                                >
                                    {item.icon && <item.icon className="tw-h-5 tw-w-5" />}
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* 移动端导航菜单 */}
                <div className={cn($styles['mobile-menu'], isMobileMenuOpen && $styles.active)}>
                    <div className="tw-absolute tw-inset-x-0 tw-top-full tw-mt-2 tw-p-4 md:tw-hidden">
                        <div className="glass-effect tw-flex tw-flex-col tw-space-y-4 tw-rounded-lg tw-p-4">
                            {items.map((item) => {
                                if (item.auth === true && !isLoggedIn) return null;
                                if (item.auth === false && isLoggedIn) return null;

                                return item.onClick ? (
                                    <button
                                        key={item.title}
                                        className="tw-flex tw-items-center tw-space-x-2 tw-transition-colors hover:tw-text-white/80"
                                        onClick={() => setIsChangelogOpen(true)}
                                    >
                                        {item.icon && <item.icon className="tw-h-5 tw-w-5" />}
                                        <span>{item.title}</span>
                                    </button>
                                ) : (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="tw-flex tw-items-center tw-space-x-2 tw-transition-colors hover:tw-text-white/80"
                                        {...(item.external ? { target: '_blank' } : {})}
                                    >
                                        {item.icon && <item.icon className="tw-h-5 tw-w-5" />}
                                        <span>{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 更新日志对话框 */}
                <div className={cn($styles['changelog-dialog'], isChangelogOpen && $styles.active)}>
                    <div className={$styles['changelog-content']}>{/* 更新日志内容 */}</div>
                </div>
            </div>
        </nav>
    );
};
