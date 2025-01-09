import { createErrorResult, createHonoApp } from '../common/utils';
import { postRoutes } from './routes';
import { queryPostPaginate } from './service';

const app = createHonoApp();
export const statsApi = app.openapi(postRoutes.paginateRoute, async (c) => {
    try {
        const query = c.req.valid('query');
        const options = Object.fromEntries(Object.entries(query).map(([k, v]) => [k, Number(v)]));
        const result = await queryPostPaginate(options);
        return c.json(result, 200);
    } catch (error) {
        return c.json(createErrorResult('查询文章分页数据失败', error), 500);
    }
});
