# OpenAnimeAPI - api

### Package.json Scripts

- `build` - uses the [swc](https://swc.rs/) CLI to tell `swc` to take the contents of the `./src` directory and output the build to the `./dist` directory
- `build-dev` - runs the `build` script, then sets the `NODE_ENV` to `development` and runs `node` with the `inspect` flag on the `./dist/server.js` file
- `dev` - sets up [nodemon](https://www.npmjs.com/package/nodemon) to watch for changes then runs the `build-dev` script
- `start` - runs the `build` script then changes `NODE_ENV` to `production` and starts the server located at `./dist/server.js`
- `test` - sets the `NODE_ENV` to `test` then runs the `jest` CLI passing in the config from the [dotenv](https://www.npmjs.com/package/dotenv) package as the argument for the `setupFiles` flag then uses the [runInBand](https://jestjs.io/docs/cli#--runinband) flag
- `reset:npm` - deletes the `node_modules` directory and reinstalls packages using [bun](https://bun.sh)

### Updating Path Aliases

When updating or adding a new path alias, there are multiple files that need to be updated.

- `tsconfig.json` - for TypeScript
    * Example Syntax - `"@@types/*": ["./types/*"]`
- `.swcrc` - for SWC
    * Example Syntax - `"@@types/*": ["./types/*"]`
- `jest.config.ts` - for Jest
    * Example Syntax - `"^@@types/(.*)$": "<rootDir>/src/types/$1"`