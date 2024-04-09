import type { 
    ValidationMessages, 
    ValidationDataTypes, 
    ErrorMapMessagesParams,
    ErrorMapMessagesReturn
} from '@@types/validation.js';

/**
 * Creates failed validation messages for Zod
 * @param {string} field - string
 * @param {string} type - string
 * @param {enum=} enumType - enum ~ Optional
 * @returns {ValidationMessages} {@link ValidationMessages}
 */
export function basicErrorMessages<T>(field: T, type: ValidationDataTypes): ValidationMessages {
    const required_error = `${field} is a required field`;
    const invalid_type_error = `${field} field should be of type ${type}`;
    return { required_error, invalid_type_error };
};

/**
 * Creates more detailed failed validation messages for Zod using ZodErrorMap 
 * @param {ErrorMapMessagesParams} {@link ErrorMapMessagesParams}
 * @returns {ErrorMapMessagesReturn} {@link ErrorMapMessagesReturn}
 */
export function errorMapMessages<T>({ issue, field, type, enumObj }: ErrorMapMessagesParams<T>): ErrorMapMessagesReturn {

    const msgObj: ErrorMapMessagesReturn = {
        message: `Error validating ${field}`
    };

    if(issue.code === "invalid_return_type") {
        msgObj.message = `${field} is a required field`;
    }

    if(issue.code === "invalid_type") {
        if(enumObj && type === "enum") {
            const enumValues = Object.values(enumObj);
            msgObj.message = `${field} is an invalid enum value. Expected values are ${enumValues.join(" | ")}`;
        }
    }

    if(issue.code === "invalid_enum_value") {
        if(enumObj && type === "enum") {
            const enumValues = Object.values(enumObj);
            msgObj.message = `${field} is an invalid enum value. Expected values are ${enumValues.join(" | ")}`;
        }
        else {
            msgObj.message = `${field} field should be of type ${type}`;
        }
    }

    return msgObj;
};