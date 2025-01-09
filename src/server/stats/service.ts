'use server';

import type { PaginateOptions, PaginateReturn } from '@/libs/db/types';
import type { Post } from '@prisma/client';

import db from '@/libs/db/client';
import { paginateTransform } from '@/libs/db/utils';

/**
 * 查询分页文章列表信息
 * @param options
 */
export const queryPostPaginate = async (
    options?: PaginateOptions,
): Promise<PaginateReturn<Post>> => {
    const data = await db.post.paginate({
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        page: 1,
        limit: 8,
        ...options,
    });
    return paginateTransform(data);
};
