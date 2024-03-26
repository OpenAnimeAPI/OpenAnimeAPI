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

// Create
async function create(req: Request<Body>, res: Response<Params>, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;

    if (!body || !Object.keys(body).length) {
        return errors.sendInvalidBody(res);
    }
    // Get One
    async function getOne(req: Request<Body>, res: Response<Params>, next: NextFunction) {
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
        return res.json({ results: anime });
        }

            const [foundAnime, findAnimeErr] = await entities.findOne<Anime>(Anime, {
                where: {
                    id: id
                }
            });

            if (findAnimeErr || !foundAnime) {
                return errors.sendEntitiesResponse({
                    res,
                    err: findAnimeErr,
                    message: "Error finding Anime",
                    entityReturn: foundAnime,
                    missingEntityReturnMessage: "Unable to find Anime"
                });
            }

    const anime = req.params.id;

    const [destroyedAnime, destroyAnimeErr] = await entities.destroy<Anime>(Anime, {
        id: anime
    });

    if (destroyAnimeErr) {
        return errors.sendResponse({ res, status: 500, err: destroyAnimeErr, message: "Error Creating Anime" });
    }

    return res.json({ results: anime });
};

export default create;
