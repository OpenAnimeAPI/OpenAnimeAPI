import type { ZodNativeEnum, ZodNumber, ZodString } from 'zod';

import { z } from 'zod';
import { Anime } from '@@entities/index.js';
import { AnimeStatus, AnimeFormat, AnimeSeason, AnimeSource } from '@@entities/Anime.js';
import { validation } from '@@utils/index.js';

type AnimeProperties = keyof Pick<Anime, (
    "title_english" | 
    "title_native" | 
    "title_romaji" | 
    "description" |
    "format" |
    "source" |
    "status" |
    "season" |
    "release_year"
)>;
type CreateSchema = Record<AnimeProperties, (
    ZodString |
    ZodNumber |
    ZodNativeEnum<typeof AnimeStatus> |
    ZodNativeEnum<typeof AnimeFormat> |
    ZodNativeEnum<typeof AnimeSource> |
    ZodNativeEnum<typeof AnimeSeason>
)>;

const errorMessages = validation.basicErrorMessages<AnimeProperties>;
const errorMapMessages = validation.errorMapMessages<AnimeProperties>;

const create = z.object<CreateSchema>({
    title_english: z.string(errorMessages("title_english", "string")), 
    title_native: z.string(errorMessages("title_native", "string")),
    title_romaji: z.string(errorMessages("title_romaji", "string")),
    description: z.string(errorMessages("description", "string")),
    format: z.nativeEnum(AnimeFormat, {
        errorMap: (issue, _ctx) => errorMapMessages({
            issue, 
            _ctx,
            field: "format",
            type: "enum",
            enumObj: AnimeFormat
        })
    }),
    source: z.nativeEnum(AnimeSource, {
        errorMap: (issue, _ctx) => errorMapMessages({
            issue, 
            _ctx,
            field: "source",
            type: "enum",
            enumObj: AnimeSource
        })
    }),
    status: z.nativeEnum(AnimeStatus, {
        errorMap: (issue, _ctx) => errorMapMessages({
            issue, 
            _ctx,
            field: "status",
            type: "enum",
            enumObj: AnimeStatus
        })
    }),
    season: z.nativeEnum(AnimeSeason, {
        errorMap: (issue, _ctx) => errorMapMessages({
            issue, 
            _ctx,
            field: "season",
            type: "enum",
            enumObj: AnimeSeason
        })
    }),
    release_year: z.coerce.number(errorMessages("release_year", "number"))
});

export default create;