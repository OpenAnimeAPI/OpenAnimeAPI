import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};


    

// Read
async function read(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = req.params;

    const [anime, animeErr] = await entities.findOne<Anime>(Anime, {
        where: {
            id: id
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

export default read;