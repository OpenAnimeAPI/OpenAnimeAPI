import type { ZodString } from 'zod';

import { z } from 'zod';
import { VoiceActor } from '@@entities/index.js';
import { validation } from '@@utils/index.js';

type VoiceActorProperties = keyof Pick<VoiceActor, (
    "first_name" |
    "last_name" |
    "country"
)>;
type UpdateSchema = Record<VoiceActorProperties, ZodString>;

const errorMessages = validation.basicErrorMessages<VoiceActorProperties>;

const update = z.object<UpdateSchema>({
    first_name: z.string(errorMessages("first_name", "string")),
    last_name: z.string(errorMessages("last_name", "string")),
    country: z.string(errorMessages("country", "string"))
});

export default update;