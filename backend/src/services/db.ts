import { Sequelize } from 'sequelize-typescript';

import SeedingsService from '../services/seedings';
import sanitizedConfig from '../utils/config';
import { seedDb } from '../utils/seeder';

export const sequelize = new Sequelize(sanitizedConfig.POSTGRES_URI,
  {
    dialect: 'postgres',
    database: sanitizedConfig.POSTGRES_DB,
    username: sanitizedConfig.POSTGRES_USER,
    password: sanitizedConfig.POSTGERS_PW,
    models: [__dirname + '/../models'],
    logging: false
  }
);

/**
 * Is DB seeding required? Checks if DB Seedings table has an entry with a
 * finished date. If app running in test environment, false is returned.
 */
const checkIfSeedingRequired = async (): Promise<boolean> => {
  if (sanitizedConfig.NODE_ENV === 'test') { 
    return false;
  }

  const latestSeeding = await SeedingsService.getLatestSeeding();

  if (!latestSeeding) {
    return true;
  }
  
  return latestSeeding.finished === null ? true : false;
};

/**
 * Initializes a connection to DB and initiates seeding process if it needed
 */
export const initDatabase = async () => {
  await sequelize.sync();
  if (await checkIfSeedingRequired()) {
    await sequelize.drop({ cascade: true });
    await sequelize.sync();

    try {
      await seedDb();
    } catch (error) {
      console.log(`Failed to seed DB: ${error}`);
    }
    
  }
};