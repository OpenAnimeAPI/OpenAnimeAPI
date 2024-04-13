import type { VoiceActorExtraParams } from '@@tests/support/types/extraParams.js';

import AppDataSource from '@@db/dataSource.js';
import initializeApp from '@@root/app.js';

import { connectToTestingDatabase } from '@@tests/support/database.support.js';
import { DATABASE } from '@@tests/support/constants/index.js';

import getRouteSpec from './get.route.js';
import postRouteSpec from './post.route.js';
import updateRouteSpec from './update.route.js';
import destroyRouteSpec from './destroy.route.js';

const app = initializeApp();
const baseEndpoint = "/voice_actors";

const extraParams: VoiceActorExtraParams = {};

describe("Voice Actors Route", () => {
    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DATABASE.DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
        jest.clearAllMocks();
    });

    describe("get route", () => {
        getRouteSpec(baseEndpoint, app, extraParams);
    });

    describe("post route", () => {
        postRouteSpec(baseEndpoint, app, extraParams);
    });

    describe("update route", () => {
        updateRouteSpec(baseEndpoint, app, extraParams);
    });

    describe("destroy route", () => {
        destroyRouteSpec(baseEndpoint, app, extraParams);
    });
});