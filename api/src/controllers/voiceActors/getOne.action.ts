import type { Request, Response } from '@@types/express.js';

import { VoiceActor } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function getOne(req: Request, res: Response<"params", Params>) {
    
    const { id } = res.locals.params;

    const [voiceActor, err] = await entities.findOne<VoiceActor>(VoiceActor, {
        where: {
            id
        }
    });

    if(err || !voiceActor) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error finding Voice Actor",
            entity: voiceActor,
            missingEntityMessage: "Unable to find Voice Actor"
        });
    }

    return res.json({ results: voiceActor });
};

export default getOne;