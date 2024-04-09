import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { VoiceActor } from '@@entities/index.js';
import { voiceActorSchemas } from '@@schemas/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

type Body = z.infer<typeof voiceActorSchemas.update>;

async function update(req: Request<Body>, res: Response<"params", Params>) {
    
    const { id } = res.locals.params;

    const validatedBody = voiceActorSchemas.update.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

    const [findRes, findErr] = await entities.findOne<VoiceActor>(VoiceActor, {
        where: {
            id
        }
    });

    if(findErr || !findRes) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error finding Voice Actor",
            entity: findRes,
            missingEntityMessage: "Unable to find Voice Actor"
        });
    }

    const [updatedVoiceActor, updateErr] = await entities.update<VoiceActor>(VoiceActor, {
        id: findRes.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country
    });

    if(updateErr || !updatedVoiceActor) {
        return errors.sendEntitiesResponse({
            res,
            err: updateErr,
            message: "Error updating Voice Actor",
            entity: updatedVoiceActor,
            missingEntityMessage: "Unable to update Voice Actor"
        });
    }

    return res.json({ results: updatedVoiceActor });
};

export default update;