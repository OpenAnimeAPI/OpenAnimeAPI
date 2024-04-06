import type { ZodError } from 'zod';
import type { Response } from '@@types/express.js';
import type { 
    SendResponseOptions, 
    ErrorLogOptions, 
    HandleTupleOptions, 
    SendEntitiesResponseParams 
} from '@@types/errors.js';

import * as logs from './logs.js';
import * as colors from './colors.js';

export function sendResponse({ res, next, err, status=500, message, issues }: SendResponseOptions): void {
    const logOptions: ErrorLogOptions = {
        color: colors.error
    };

    if(err) {
        logOptions.err = err;
    }

    if(message) {
        logOptions.message = message;
    }

    if(err && message) {
        logs.error(logOptions);
    }

    if(next && err) {
        next(err);
    }
    else {
        res.status(status).json({ 
            error: true, 
            message, 
            ...(issues && { issues }) 
        });
    }
};

export function handleTuple<T>({res, err, errMsg}: HandleTupleOptions<T>): Error | undefined {    
    if(err) {
        return err;
    }
    else if(!res) {
        return new Error(errMsg);
    }
 
    return undefined;
};

export function sendEntitiesResponse<T>({ res, err, message, entity, missingEntityMessage }: SendEntitiesResponseParams<T>) {
    if(err) {
        return sendResponse({ res, err, status: 500, message: message ?? err.message });
    }

    if(!entity) {
        return sendResponse({ res, status: 404, message: missingEntityMessage });
    }
};

export function sendInvalidBody<T>(res: Response, zodError: ZodError<T>, message?: string) {
    return sendResponse({ 
        res, 
        status: 400, 
        message: message ?? "Invalid Body", 
        issues: zodError.errors 
    });
};