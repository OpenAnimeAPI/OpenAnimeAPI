import Anime from '@@root/entities/Anime';
import type { Request, Response, NextFunction } from '@@types/express.js';
import { entities, errors } from '@@utils/index.js';

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

/**
 * Creates a new anime.
 * 
 * @param {Request<Body>} req - The request object.
 * @param {Response<Params>} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns {Promise<void>} A promise that resolves when the anime is created.
 */

async function create(req: Request<Body>, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = params;
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

    if (animeErr || !anime) {
        return errors.sendEntitiesResponse({
            res,
            err: animeErr,
            message: "Error creating Anime",
            entityReturn: anime,
            missingEntityReturnMessage: "Unable to create Anime"
        });
    }

    return res.json({ results: anime });
};

export default create;
