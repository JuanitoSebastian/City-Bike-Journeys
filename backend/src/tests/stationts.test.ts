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

  test('Stations sorted by id on default', async () => {
    const response = await api.get('/api/station');
    expect(response.body.data[0].id).toEqual('001');
    expect(response.body.data[1].id).toEqual('036');
    expect(response.body.data[2].id).toEqual('043');
  });

  test('Limit returns correct amount of stations', async () => {
    const response = await api.get('/api/station?limit=2');
    expect(response.body.data[0].id).toEqual('001');
    expect(response.body.data[1].id).toEqual('036');
    expect(response.body.data).toHaveLength(2);
  });

  test('Offset returns correct of stations', async () => {
    const response = await api.get('/api/station?limit=2&offset=1');
    expect(response.body.data[0].id).toEqual('036');
    expect(response.body.data[1].id).toEqual('043');
    expect(response.body.data).toHaveLength(2);
  });
});

afterAll(async () => {
  await sequelize.close();
});