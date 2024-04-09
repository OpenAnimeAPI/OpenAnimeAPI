import type { Request, Response } from '@@types/express.js';
import type { PaginationUrl, PaginatedResponse } from '@@types/pagination.js';

import { ENV } from '@@constants/index.js';

export function paginateResponse<T>(req: Request, res: Response<"pagination">, results: [T[], number]): PaginatedResponse<T> {

    const baseUrl = ENV.IS_DEV ? `${ENV.BASE_URL}:${ENV.API_PORT}` : ENV.BASE_URL;

    const { page, limit } = res.locals.pagination;
    const regEx: RegExp = /(?=\?)(.*)/gi;
    const requestedUrl: string = req.originalUrl.replace(regEx, "");

    const count = results[1];
    let next: PaginationUrl = null;
    let prev: PaginationUrl = null;

    if((page * limit) < count) {
        next = baseUrl + requestedUrl + `?page=${page + 1}`;
    }

    if(page > 1) {
        prev = baseUrl + requestedUrl + `?page=${page - 1}`;
    }

    return {
        count: count,
        next: next,
        previous: prev,
        results: results[0]
    };
};