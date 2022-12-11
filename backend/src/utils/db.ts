import { Sequelize } from 'sequelize-typescript';
import Station from '../models/station';
import Trip from '../models/trip';
import sanitizedConfig from "./config";
import { seedDb } from './seeder';

export const sequelize = new Sequelize(sanitizedConfig.POSTGRES_URI, {
  dialect: 'postgres',
  database: sanitizedConfig.POSTGRES_DB,
  username: sanitizedConfig.POSTGRES_USER,
  password: sanitizedConfig.PSOTGERS_PW,
  models: [__dirname + '/../models']
});

export const initDatabase = async () => {
  await sequelize.sync();
  if (await Station.count() === 0 && await Trip.count() === 0) {
    console.log('Empty tables');
    seedDb();
  }
};
