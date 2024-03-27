import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};

// Update
/**
 * Updates an Anime entity.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the updated Anime entity.
 */
async function update(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = req.params;

    const [anime, animeErr] = await entities.update<Anime>(Anime, {
        id: id
    });

    if(animeErr || !anime) {
        return errors.sendEntitiesResponse({
            res,
            err: animeErr,
            message: "Error updating Anime",
            entityReturn: anime,
            missingEntityReturnMessage: "Unable to update Anime"
        }); 
    }

    return res.json({ results: anime });
};

export default update;