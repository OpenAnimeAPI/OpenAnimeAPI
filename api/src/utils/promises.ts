import { PromiseTuple } from '@@types/promises.js';

export async function handle<T>(promise: Promise<T>): PromiseTuple<T> {
    return promise
    .then((results: T) => {
        return [results, undefined] as [T, undefined];
    })
    .catch((err: Error) => {
        return [undefined, err]
    });
};