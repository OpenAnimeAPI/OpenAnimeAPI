import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};

/**
 * Retrieves a single Anime entity by its ID.
 * 
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The Express NextFunction middleware.
 * @returns A JSON response containing the Anime entity if found, or an error response if not found.
 */

async function read(req: Request, res: Response<Params>, next: NextFunction) {
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

export default read;