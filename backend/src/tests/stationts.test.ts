import { sequelize } from '../services/db';
import supertest from 'supertest';
import TestHelper from './helper';
import app from '../app';
import Station from '../models/station';
import Trip from '../models/trip';
import City from '../models/city';

const api = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
});

describe('Stations endpoint', () => {
  beforeAll(async () => {
    await TestHelper.seedTestDataToDb();
  });

  afterAll(async () => {
    await Station.destroy({ truncate: true, cascade: true });
    await City.destroy({ truncate: true, cascade: true });
    await Trip.destroy({ truncate: true, cascade: true });
  });

  test('All stations are returned', async () => {
    const reponse = await api.get('/api/station');
    expect(reponse.body.data).toHaveLength(3);
  });
});

afterAll(async () => {
  await sequelize.close();
});