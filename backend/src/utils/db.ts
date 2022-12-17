import { Sequelize } from 'sequelize-typescript';
import sanitizedConfig from "./config";
import { seedDb } from './seeder';
import Station from '../models/station';
import Trip from '../models/trip';

export const sequelize = new Sequelize(sanitizedConfig.POSTGRES_URI, {
  dialect: 'postgres',
  database: sanitizedConfig.POSTGRES_DB,
  username: sanitizedConfig.POSTGRES_USER,
  password: sanitizedConfig.PSOTGERS_PW,
  models: [__dirname + '/../models'],
  logging: false
});

export const initDatabase = async () => {
  // TOOD: Improve this check. How to really determine if seeding required?
  await sequelize.sync();
  if (await Station.count() === 0 || await Trip.count() === 0) {
    await sequelize.drop({ cascade: true });
    await sequelize.sync();
    await seedDb();
  }
};
