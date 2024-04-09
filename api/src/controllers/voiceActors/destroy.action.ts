import type { Request, Response } from '@@types/express.js';

import { VoiceActor } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function destroy(req: Request, res: Response<"params", Params>) {

    const { id } = res.locals.params;

    const [voiceActor, err] = await entities.destroy<VoiceActor>(VoiceActor, {
        id
    });

    if(err || !voiceActor) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error deleting Voice Actor",
            entity: voiceActor,
            missingEntityMessage: "Unable to delete Voice Actor"
        });
    }

    return res.json({ results: voiceActor });
};

export default destroy;