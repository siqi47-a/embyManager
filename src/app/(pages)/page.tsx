import type { FC } from 'react';

import { fetchApi } from '@/libs/api';
import { Users } from 'lucide-react';
import Image from 'next/image';

const HomePage: FC = async () => {
    // 获取统计数据
    const stats = await fetchApi(async (c) => c.api.stats.$get());
    const { allRegisterUserCount, todayLoginUserCount, latestMediaComment } = stats;

    return (
        <main className="pt-24">
            {/* Hero区域 */}
            <div className="relative min-h-[90vh] md:min-h-screen">
                <div className="absolute top-0 left-0 right-0 z-10 pt-24 md:pt-32 px-4 md:px-6 text-center md:text-left md:ml-40 lg:ml-64">
                    <span className="inline-block glass-effect px-3 py-1 rounded-full text-sm mb-4">
                        欢迎来到思奇
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                        专业的影视管理平台
                    </h1>
                </div>

                {/* 背景图片和渐变 */}
                <div className="absolute inset-0">
                    <Image
                        src="/static/media/img/media-background.jpeg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                </div>

                {/* 主要内容区域 */}
                <div className="relative h-full flex items-center px-4 md:px-6">
                    <div className="max-w-2xl mx-auto md:ml-40 lg:ml-64 animate-fade-in mt-64">
                        <p className="text-base md:text-lg text-white/80 mb-8">
                            由siqi.com提供技术支持，为您带来优质的影视及管理服务。多条线路保障，稳定可靠的观影体验。
                        </p>
                        {/* 这里需要根据用户登录状态显示不同按钮 */}
                        <button
                            onClick={() => (window.location.href = '/media/user/login')}
                            className="glass-effect w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center justify-center space-x-2 hover:bg-white/20 transition-all duration-300"
                        >
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
                        </button>
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
