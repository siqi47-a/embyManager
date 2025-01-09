import { z } from 'zod';

/**
 * 文章查询响应数据结构
 */
export const postItemResponseSchema = z
    .object({
        id: z.string(),
        title: z.string(),
        thumb: z.string(),
        summary: z.string().nullable().optional(),
        keywords: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        slug: z.string().nullable().optional(),
        body: z.string(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date(),
    })
    .strict();

/**
 * 文章分页查询响应数据结构
 */
export const postPaginateResponseSchema = z.object({
    items: z.array(postItemResponseSchema),
    meta: z.object({
        itemCount: z.coerce.number(),
        totalItems: z.coerce.number().optional(),
        perPage: z.coerce.number(),
        totalPages: z.coerce.number().optional(),
        currentPage: z.coerce.number(),
    }),
});

/**
 * 文章分页查询请求数据结构
 */
export const postPaginateRequestQuerySchema = z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    orderBy: z.enum(['asc', 'desc']).optional(),
});
