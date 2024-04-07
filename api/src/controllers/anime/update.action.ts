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
        created_at?: Date;
        updated_at?: Date;
        characters?: Character[];
        studio?: Studio;
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

    const { title_english, title_romaji, title_native, description, format, episodes, episode_duration, source, 
            status, release_year, start_date, end_date, created_at, updated_at, characters, studio } = req.body;
    if(!title_english || !title_romaji || !title_native || !description || !format || !episodes || !episode_duration || 
        !source || !status || !release_year || !start_date || !end_date || !created_at || !updated_at || !characters || !studio) {
        return errors.sendInvalidBody(res);
    };

    const [anime, animeErr] = await entities.insert<Anime>(Anime, {
        id: id,
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
        created_at: body.created_at,
        updated_at: body.updated_at,
        characters: body.characters,
        studio: body.studio
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