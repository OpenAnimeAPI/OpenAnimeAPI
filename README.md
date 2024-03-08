# OpenAnimeAPI
Project to create a fully featured public Anime API

### Environment Variables

Create a `.env` file in the root directory and add the following:

```
ENVIRONMENT=DEV
API_PORT=3001

DOCKER_REGISTRY=localhost

DB_TYPE=postgres
DB_HOST=db
DB_USERNAME=[desired username]
DB_PASSWORD=[desired password]
DB_NAME=OpenAnimeAPI
DB_PORT=5432

TESTING_DB_HOST=testing_db
TESTING_DB_NAME=OpenAnimeAPI_Testing
TESTING_DB_PORT=5432
```

### Scripts

* `api_shell.sh` - opens shell for the api container to run commands
* `clean_dist.sh` - deletes all existing `/dist/` directories for fresh builds from SWC and TypeScript
* `db_shell.sh` - opens the shell for the main database to run commands
* `start_dev.sh` - docker compose command to build and start the development server
* `test_api.sh` - drops all database tables so TypeORM can repopulate updated entities and runs Jest tests from `api/src/__tests__/`
* `test_db_shell.sh` - opens the shell for the testing database to run commands

### Start Up

- Make sure you have the following technologies installed
    - Docker - [Desktop](https://www.docker.com/products/docker-desktop/) | [CLI / Linux](https://docs.docker.com/engine/install/ubuntu/)
    - [Bun](https://bun.sh/docs/installation)
    - Node.js (check `/api/.nvmrc` for Node version)
- Create a `.env` file in the root of the project
- `cd` into `/api` and run `bun install`
- Run the `start_dev.sh` script in the `/scripts/` directory

### Testing

While the api docker container is running, run the `test_api.sh` script in the `/scripts/` directory

### Notes

- The project has unused middleware setup for pagination. The `defaults.ts` inside `/api/src/constants/` contains 
the `LIMIT` variable which handles how many database objects you want to send in the response
- Utility methods setup for TypeORM interactions inside `/api/src/utils/entities.ts`. These allow for use of tuple responses for error handling

Example:
```typescript
import { Request, Response, NextFunction } from 'express';

import { User } from '../../../entities/index.js';
import { errors, entities, pagination } from '../../../utils/index.js';

async function index(req: Request, res: Response, next: NextFunction) {
    
    const { limit, offset } = res.locals;

    const [users, err] = await entities.indexAndCount<User>(User, {
        limit, offset
    });

    if(err) {
        return errors.sendResponse({ res, status: 500, err, message: "Error finding Users" });
    }

    if(!fortunes) {
        return errors.sendResponse({ res, status: 404, message: "No Users found" });
    }

    const response: PaginatedResponse<Fortune> = pagination.paginateResponse<Fortune>(req, res, fortunes);

    return res.json(response);
};

export default index;
```