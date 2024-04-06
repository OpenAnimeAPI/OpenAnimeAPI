import type { 
    Request as ExpressRequest, 
    Response as ExpressResponse, 
    NextFunction as ExpressNextFunction 
} from 'express';
import type { AuthPayload } from './auth.js';

export interface LocalsPagination {
    page: number,
    limit: number,
    offset: number
};

export interface Locals<T> {
    pagination: LocalsPagination, 
    auth: AuthPayload,
    params: T
};

export type AuthenticatedResponse<T = unknown> = ExpressResponse<unknown, Pick<Locals<T>, "auth" | "params">>;
export type PaginatedResponse<T = unknown> = ExpressResponse<unknown, Pick<Locals<T>, "pagination">>;
export type AuthenticatedPaginatedResponse<T = unknown> = ExpressResponse<unknown, Locals<T>>;

export type APResponse = AuthenticatedPaginatedResponse;

export type Request<T = unknown, D = unknown> = ExpressRequest<D, unknown, T>;
export type Response<T = unknown> = ExpressResponse<unknown, Partial<Locals<T>>>;
export type NextFunction = ExpressNextFunction;