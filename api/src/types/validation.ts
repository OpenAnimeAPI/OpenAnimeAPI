import { ErrorMapCtx, ZodIssueOptionalMessage } from "zod";

export interface ValidationMessages {
    required_error: string,
    invalid_type_error: string
};

export type ValidationDataTypes = (
    "string" |
    "number" |
    "string array" |
    "number array" |
    "enum"
);

export interface ErrorMapMessagesParams<T> {
    issue: ZodIssueOptionalMessage,
    _ctx: ErrorMapCtx,
    field: T,
    type: ValidationDataTypes,
    enumObj?: object
};

export interface ErrorMapMessagesReturn {
    message: string
};