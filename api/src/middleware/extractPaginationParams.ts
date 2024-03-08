import type { Request, PaginatedResponse, NextFunction } from '@@types/express.js';

import { DEFAULTS } from '@@constants/index.js';

function extractPaginationParams(req: Request, res: PaginatedResponse, next: NextFunction) {

    const page: number = typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 1;
    const limit: number = DEFAULTS.PAGINATION.LIMIT;
    const offset: number = limit * (page - 1);

    res.locals.pagination = {
        page, limit, offset
    };

    next();
};

export default extractPaginationParams;