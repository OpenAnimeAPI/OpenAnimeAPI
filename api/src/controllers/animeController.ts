import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    animeId: number
};

// Create
async function create(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { animeId } = params as Params;

    const [anime, animeErr] = await entities.insert<Anime>(Anime, req.body);

    if(animeErr) {
        return errors.sendResponse({ res, status: 500, err: animeErr, message: "Error Creating Anime" });
    }

    return res.json({ results: anime });
};

// Read
async function read(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { animeId } = params as Params;

    const [anime, animeErr] = await entities.findOne<Anime>(Anime, {
        where: {
            id: animeId
        }
    });

    if(animeErr) {
        return errors.sendResponse({ res, status: 500, err: animeErr, message: "Error Reading Anime" });
    }

    if(!anime) {
        return errors.sendResponse({ res, status: 404, message: "No Anime Found" });
    }

    return res.json({ results: anime });
};

// Update
async function update(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { animeId } = params as Params;

    const [anime, animeErr] = await entities.update<Anime>(Anime, {
        id: animeId
    });

    if(animeErr) {
        return errors.sendResponse({ res, status: 500, err: animeErr, message: "Error Updating Anime" });
    }

    return res.json({ results: anime });
};

// Delete
async function remove(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { animeId } = params as Params;

    const [anime, animeErr] = await entities.destroy<Anime>(Anime, {
        id: animeId
    });

    if(animeErr) {
        return errors.sendResponse({ res, status: 500, err: animeErr, message: "Error Deleting Anime" });
    }

    return res.json({ message: "Anime deleted successfully" });
};

export default {
    create,
    read,
    update,
    remove
};