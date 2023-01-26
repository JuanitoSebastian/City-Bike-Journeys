import { Sequelize } from 'sequelize-typescript';
import sanitizedConfig from '../utils/config';
import { seedDb } from '../utils/seeder';
import Station from '../models/Station';
import Trip from '../models/Trip';

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

export const initDatabase = async () => {
  // TOOD: Improve this check. How to really determine if seeding required?
  await sequelize.sync();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (sanitizedConfig.NODE_ENV !== 'test' && (await Station.count() === 0 || await Trip.count() === 0)) {
    await sequelize.drop({ cascade: true });
    await sequelize.sync();
    await seedDb();
  }
};