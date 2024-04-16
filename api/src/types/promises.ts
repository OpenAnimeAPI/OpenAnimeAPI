import { QueryFailedError } from 'typeorm';

export type PromiseSuccess<T> = T | null | undefined;
export type PromiseError<T> = T | QueryFailedError | undefined;
export type PromiseTuple<T, D = Error> = Promise<[PromiseSuccess<T>, PromiseError<D>]>