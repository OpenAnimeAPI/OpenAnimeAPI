import type { ZodString } from 'zod';

import { z } from 'zod';
import { Studio } from '@@entities/index.js';
import { validation } from '@@utils/index.js';

type StudioProperties = keyof Pick<Studio, "name">;
type CreateSchema = Record<StudioProperties, ZodString>;

const errorMessages = validation.basicErrorMessages<StudioProperties>;

const create = z.object<CreateSchema>({
    name: z.string(errorMessages("name", "string"))
});

export default create;