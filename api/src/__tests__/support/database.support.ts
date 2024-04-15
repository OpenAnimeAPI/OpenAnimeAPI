import type { BaseEntity, Repository } from 'typeorm';

import AppDataSource from '@@db/dataSource.js';
import waitForPostgres from '@@db/waitForPostgres.js';

import dbConfig from './dbConfig.support.js';

export async function connectToTestingDatabase() {
    AppDataSource.setOptions(dbConfig);
    await waitForPostgres(AppDataSource);
};

export async function truncateTable<T extends BaseEntity>(repository: Repository<T>, tableName: string) {
    return repository.query(`TRUNCATE TABLE ${tableName} CASCADE;`);
};