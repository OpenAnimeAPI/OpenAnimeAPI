import type { Request, Response, NextFunction } from '@@types/express.js';
import { errors, entities } from '@@utils/index.js';
import { Anime } from '@@entities/index.js';

interface Params {
    id: number
};

async function destroy(req: Request, res: Response<Params>, next: NextFunction) {
    const { params } = res.locals;
    const { id } = req.params;

    const [anime, animeErr] = await entities.destroy<Anime>(Anime, {
        id: id
    });

    if(animeErr) {
        return errors.sendResponse({ res, status: 500, err: animeErr, message: "Error Deleting Anime" });
    }

    return res.json({ message: "Anime deleted successfully" });
};

export default destroy;