import { 
    Request, 
    NextFunction, 
    PaginatedResponse as PaginatedExpressResponse 
} from '@@types/express.js';  
import type { PaginatedResponse } from '@@types/pagination.js';  

import { Anime } from '@@entities/index.js';  

import { errors, entities, pagination } from '@@utils/index.js';  

async function index(req: Request, res: PaginatedExpressResponse, next: NextFunction) {  
    
    const { limit, offset } = res.locals.pagination;  

    const [anime, err] = await entities.indexAndCount<Anime>(Anime, {  
        limit, offset  
    });  

    if(err || !anime) {  
        return errors.sendEntitiesResponse({  
            res,  
            err,  
            message: "Error finding Anime",  
            entityReturn: anime,  
            missingEntityReturnMessage: "Unable to find Anime"  
        });  
    }  

    const response: PaginatedResponse<Anime> = pagination.paginateResponse<Anime>(req, res, anime);  

    return res.json(response);  
};  

export default index;