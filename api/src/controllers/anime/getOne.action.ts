import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};

/**
 * Retrieves a single anime by its ID.
 * 
 * @param {Request} req - The request object.
 * @param {Response<Params>} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the anime is retrieved.
 */

async function getOne(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = req.params;

    const [anime, animeErr] = await entities.findOne<Anime>(Anime, {
        where: {
            id: id
        }
    });

    if (animeErr || !anime) {
        return errors.sendEntitiesResponse({
            res,
            err: animeErr,
            message: "Error finding Anime",
            entityReturn: anime,
            missingEntityReturnMessage: "Unable to find Anime"
        });
    }

    if(!anime) {
        return errors.sendResponse({ res, status: 404, message: "No Anime Found" });
    }

    return res.json({ results: anime });
};

export default getOne;