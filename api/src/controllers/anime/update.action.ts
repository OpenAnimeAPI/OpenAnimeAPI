import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime, Character, Studio } from '@@entities/index.js';
import { AnimeFormat, AnimeSource, AnimeStatus } from '@@entities/Anime.js';

interface Params {
    id: number
};

interface Body {
        // Define the expected keys and their types here
        title_english?: string;
        title_romaji?: string;
        title_native?: string;
        description?: string;
        format?: AnimeFormat;
        episodes?: number;
        episode_duration?: number;
        source?: AnimeSource;
        status?: AnimeStatus;
        release_year?: number;
        start_date?: Date;
        end_date?: Date;
    }

// Update
/**
 * Updates an anime.
 * 
 * @param {Request<Body>} req - The request object.
 * @param {Response<Params>} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
async function update(req: Request<Body>, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = req.params;
    const { body } = req;

    const { title_english, title_romaji, title_native, description, format, episodes, episode_duration, source, 
            status, release_year, start_date, end_date } = req.body;
    if(!title_english || !title_romaji || !title_native || !description || !format || !episodes || !episode_duration || 
        !source || !status || !release_year || !start_date || !end_date) {
        return errors.sendInvalidBody(res);
    };

    const [anime, animeErr] = await entities.update<Anime>(Anime, {
        title_english: body.title_english,
        title_romaji: body.title_romaji,
        title_native: body.title_native,
        description: body.description,
        format: body.format,
        episodes: body.episodes,
        episode_duration: body.episode_duration,
        source: body.source,
        status: body.status,
        release_year: body.release_year,
        start_date: body.start_date,
        end_date: body.end_date,
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