import type { ZodString } from 'zod';

import { z } from 'zod';
import { VoiceActor } from '@@entities/index.js';
import { validation } from '@@utils/index.js';

type VoiceActorProperties = keyof Pick<VoiceActor, "first_name" | "last_name" | "country">;
type CreateSchema = Record<VoiceActorProperties, ZodString>;

const errorMessages = validation.basicErrorMessages<VoiceActorProperties>;

const create = z.object<CreateSchema>({
    first_name: z.string(errorMessages("first_name", "string")),
    last_name: z.string(errorMessages("last_name", "string")),
    country: z.string(errorMessages("country", "string"))
});

export default create;