import { Sequelize } from 'sequelize-typescript';
import sanitizedConfig from "./config";
import { seedDb } from './seeder';

export const sequelize = new Sequelize(sanitizedConfig.POSTGRES_URI, {
  dialect: 'postgres',
  database: sanitizedConfig.POSTGRES_DB,
  username: sanitizedConfig.POSTGRES_USER,
  password: sanitizedConfig.PSOTGERS_PW,
  models: [__dirname + '/../models'],
  logging: false
});

export const initDatabase = async () => {
  await sequelize.drop({ cascade: true });
  await sequelize.sync();
  await seedDb();
};
