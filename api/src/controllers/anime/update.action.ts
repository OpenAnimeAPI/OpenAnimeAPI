import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};

interface Body {
        // Define the expected keys and their types here
        title?: string;
        description?: string;
        episodes?: number;
        rating?: number;
        status?: string;
    }

// Update
/**
 * Updates an Anime entity.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns A JSON response with the updated Anime entity.
 */
async function update(req: Request<Body>, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = req.params;
    const { body } = req;

    const { title, description, episodes, rating, status } = req.body;
    if(!title || !description || !episodes || !rating || !status) {
        return errors.sendInvalidBody(res);
    };

    const [anime, animeErr] = await entities.insert<Anime>(Anime, {
        id: id,
        title: body.title,
        description: body.description,
        episodes: body.episodes,
        rating: body.rating,
        status: body.status
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