import type { Request, Response } from '@@types/express.js';

import { VoiceActor } from '@@entities/index.js';
import { entities, errors, pagination } from '@@utils/index.js';

async function index(req: Request, res: Response<"pagination">) {
    
    const { limit, offset } = res.locals.pagination;

    const [voiceActors, err] = await entities.indexAndCount<VoiceActor>(VoiceActor, {
        limit, offset
    });

    if(err || !voiceActors) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error indexing Voice Actors",
            entity: voiceActors,
            missingEntityMessage: "Unable to index Voice Actors"
        });
    }

    const paginatedResponse = pagination.paginateResponse<VoiceActor>(req, res, voiceActors);

    return res.json(paginatedResponse);
};

export default index;