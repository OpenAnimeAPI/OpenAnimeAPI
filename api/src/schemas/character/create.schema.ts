import type { ZodNativeEnum, ZodString } from 'zod';

import { z } from 'zod';
import { Character } from '@@entities/index.js';
import { CharacterType } from '@@entities/Character.js';
import { validation } from '@@utils/index.js';

type CharacterProperties = keyof Pick<Character, (
    "first_name" |
    "last_name" |
    "type"
)>;

type CreateSchema = Record<CharacterProperties, (
    ZodString |
    ZodNativeEnum<typeof CharacterType>
)>;

const errorMessages = validation.basicErrorMessages<CharacterProperties>;
const errorMapMessages = validation.errorMapMessages<CharacterProperties>;

const create = z.object<CreateSchema>({
    first_name: z.string(errorMessages("first_name", "string")),
    last_name: z.string(errorMessages("last_name", "string")),
    type: z.nativeEnum(CharacterType, {
        errorMap: (issue, _ctx) => errorMapMessages({
            issue,
            _ctx,
            field: "type",
            type: "enum",
            enumObj: CharacterType
        }) 
    })
});

export default create;