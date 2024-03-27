import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};

/**
 * Deletes an Anime entity from the database.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A JSON response indicating the success or failure of the deletion.
 */

async function destroy(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = req.params;

    const [anime, animeErr] = await entities.destroy<Anime>(Anime, {
        id: id
    });

    if(animeErr || !anime) {
        return errors.sendEntitiesResponse({
            res,
            err: animeErr,
            message: "Error deleting Anime",
            entityReturn: anime,
            missingEntityReturnMessage: "Unable to delete Anime"
        });
    }

    return res.json({ message: "Anime deleted successfully" });
};

export default destroy;