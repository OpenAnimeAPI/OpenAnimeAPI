import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { VoiceActor } from '@@entities/index.js';
import { voiceActorSchemas } from '@@schemas/index.js';

import { entities, errors } from '@@utils/index.js';

type Body = z.infer<typeof voiceActorSchemas.create>;

async function create(req: Request<Body>, res: Response) {

    const validatedBody = voiceActorSchemas.create.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

    const [voiceActor, err] = await entities.insert<VoiceActor>(VoiceActor, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country
    });

    if(err || !voiceActor) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error creating Voice Actor",
            entity: voiceActor,
            missingEntityMessage: "Unable to create Voice Actor"
        });
    }

    return res.json({ results: voiceActor });
};

export default create;