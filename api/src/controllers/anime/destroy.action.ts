import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};

/**
 * Deletes an anime by its ID.
 * 
 * @param {Request} req - The request object.
 * @param {Response<Params>} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns {Promise<void>} - A promise that resolves when the anime is deleted successfully.
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