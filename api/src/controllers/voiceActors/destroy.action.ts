import type { Request, Response } from '@@types/express.js';

import { VoiceActor } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function destroy(req: Request, res: Response<"params", Params>) {

    const { id } = res.locals.params;

    const [voiceActor, findErr] = await entities.findOne<VoiceActor>(VoiceActor, {
        where: {
            id
        }
    });

    if(findErr || !voiceActor) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error deleting Voice Actor",
            entity: voiceActor,
            missingEntityMessage: "Unable to delete Voice Actor"
        });
    }

    const [deletedVoiceActor, deleteErr] = await entities.destroy<VoiceActor>(VoiceActor, voiceActor);

    if(deleteErr || !deletedVoiceActor) {
        return errors.sendEntitiesResponse({
            res,
            err: deleteErr,
            message: "Error deleting Voice Actor",
            entity: deletedVoiceActor,
            missingEntityMessage: "Unable to delete Voice Actor"
        });
    }

    return res.json({ results: deletedVoiceActor });
};

export default destroy;