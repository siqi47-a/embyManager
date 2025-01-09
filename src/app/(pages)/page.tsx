import type { FC } from 'react';

import { Button } from '@/app/_components/shadcn/ui/button';
import { fetchApi } from '@/libs/api';
import { Users } from 'lucide-react';
import Image from 'next/image';

import backGround from '../styles/images/media-background.jpeg';

const HomePage: FC = async () => {
    // 获取统计数据
    const stats = await fetchApi(async (c) => c.api.stats.$get());
    const { allRegisterUserCount, todayLoginUserCount, latestMediaComment } = stats;

    return (
        <main className="tw-pt-24">
            {/* Hero区域 */}
            <div className="tw-relative tw-min-h-[90vh] md:tw-min-h-screen">
                <div className="tw-absolute tw-inset-x-0 tw-top-0 tw-z-10 tw-px-4 tw-pt-24 tw-text-center md:tw-ml-40 md:tw-px-6 md:tw-pt-32 md:tw-text-left lg:tw-ml-64">
                    <span className="glass-effect tw-mb-4 tw-inline-block tw-rounded-full tw-px-3 tw-py-1 tw-text-sm">
                        欢迎来到思奇
                    </span>
                    <h1 className="tw-mb-4 tw-text-3xl tw-font-bold md:tw-text-5xl lg:tw-text-6xl">
                        专业的影视管理平台
                    </h1>
                </div>

                {/* 背景图片和渐变 */}
                <div className="tw-absolute tw-inset-0">
                    <Image src={backGround} alt="Background" fill className="object-cover" />
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-black tw-via-black/50 tw-to-transparent" />
                </div>

                {/* 主要内容区域 */}
                <div className="tw-relative tw-flex tw-h-full tw-items-center tw-px-4 md:tw-px-6">
                    <div className="tw-animate-fade-in tw-mx-auto tw-mt-64 tw-max-w-2xl md:tw-ml-40 lg:tw-ml-64">
                        <p className="tw-mb-8 tw-text-base tw-text-white/80 md:tw-text-lg">
                            由siqi.com提供技术支持，为您带来优质的影视及管理服务。多条线路保障，稳定可靠的观影体验。
                        </p>
                        {/* 这里需要根据用户登录状态显示不同按钮 */}
                        <Button className="glass-effect tw-flex tw-w-full tw-items-center tw-justify-center tw-space-x-2 tw-rounded-full tw-px-6 tw-py-3 tw-transition-all tw-duration-300 hover:tw-bg-white/20 md:tw-w-auto md:tw-px-8 md:tw-py-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 md:h-6 md:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>立即体验</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* 统计数据区域 */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 glass-effect rounded-lg">
                        <div className="flex items-center space-x-4">
                            <Users className="h-8 w-8" />
                            <div>
                                <h3 className="text-sm font-medium text-white/60">站点总用户数</h3>
                                <p className="text-2xl font-bold">{allRegisterUserCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 glass-effect rounded-lg">
                        <div className="flex items-center space-x-4">
                            <Users className="h-8 w-8" />
                            <div>
                                <h3 className="text-sm font-medium text-white/60">
                                    24小时活跃用户数
                                </h3>
                                <p className="text-2xl font-bold">{todayLoginUserCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 最新内容区域 */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">最新更新</h2>
                <div
                    id="latest-update-loading"
                    className="loading inset-0 bg-black/50 flex items-center justify-center w-full z-50"
                    style={{ height: '332px' }}
                >
                    {/* 加载动画 */}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory hide-scrollbar latest-movies-here" />
            </section>

            {/* 影视评价系统 */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">最新评价</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 评价列表将通过API获取并渲染 */}
                </div>
            </section>

            {/* 服务器状态区域 */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">线路状态</h2>
                <h3 className="text-sm text-white/60 mb-4">
                    * 线路状态每10分钟更新一次，登录即可查看线路详情、测速
                </h3>
                <div
                    id="line-list-loading"
                    className="loading inset-0 bg-black/50 flex items-center justify-center w-full z-50"
                >
                    {/* 加载动画 */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 line-list-here" />
            </section>

            <footer className="text-center py-4">
                <p>&copy; {new Date().getFullYear()} Powered By Randallanjie.com</p>
            </footer>
        </main>
    );
};

export default HomePage;
