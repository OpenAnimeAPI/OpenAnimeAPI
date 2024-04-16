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

export type Request<T = unknown, D = unknown> = ExpressRequest<D, unknown, T>;
export type Response<T extends keyof Locals<D> = "params", D = unknown> = ExpressResponse<unknown, Pick<Locals<D>, T>>
export type NextFunction = ExpressNextFunction;