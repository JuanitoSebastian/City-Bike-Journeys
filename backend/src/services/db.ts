import { Sequelize } from 'sequelize-typescript';
import sanitizedConfig from '../utils/config';
import { seedDb } from '../utils/seeder';
import Station from '../models/station';
import Trip from '../models/trip';

export const sequelize = new Sequelize(sanitizedConfig.NODE_ENV === 'test'
  ? sanitizedConfig.POSTGRES_TEST_URI
  : sanitizedConfig.POSTGRES_URI,
  {
    dialect: 'postgres',
    database: sanitizedConfig.NODE_ENV === 'test' ? sanitizedConfig.POSTGRES_TEST_DB : sanitizedConfig.POSTGRES_DB,
    username: sanitizedConfig.NODE_ENV === 'test' ? sanitizedConfig.POSTGRES_TEST_USER : sanitizedConfig.POSTGRES_USER,
    password: sanitizedConfig.NODE_ENV === 'test' ? sanitizedConfig.POSTGERS_TEST_PW : sanitizedConfig.POSTGERS_PW,
    models: [__dirname + '/../models'],
    logging: false
  }
);

export const initDatabase = async () => {
  // TOOD: Improve this check. How to really determine if seeding required?
  await sequelize.sync();
  if (sanitizedConfig.NODE_ENV !== 'test' && (await Station.count() === 0 || await Trip.count() === 0)) {
    await sequelize.drop({ cascade: true });
    await sequelize.sync();
    await seedDb();
  }
};
