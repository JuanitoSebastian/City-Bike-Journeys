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
  await TestHelper.seedTestDataToDb();
});

describe('Trip endpoint', () => {
  test('All trips are returned', async () => {
    const reponse = await api.get('/api/trip');
    expect(reponse.body.data).toHaveLength(5);
  });

  test('Trips are sorted by start time', async () => {
    const response = await api.get('/api/trip');
    expect(response.body.data[0].startStation).toEqual('Karhupuisto');
    expect(response.body.data[0].distanceMeters).toEqual(5366);
    expect(response.body.data[1].startStation).toEqual('Karhupuisto');
    expect(response.body.data[1].distanceMeters).toEqual(2043);
    expect(response.body.data[2].startStation).toEqual('Kaivopark');
    expect(response.body.data[2].distanceMeters).toEqual(4010);
    expect(response.body.data[3].startStation).toEqual('Apollonkatu');
    expect(response.body.data[3].distanceMeters).toEqual(3150);
    expect(response.body.data[4].startStation).toEqual('Kaivopark');
    expect(response.body.data[4].distanceMeters).toEqual(1698);
  });

  test('Language set to fi returns in finnish', async () => {
    const response = await api.get('/api/trip?language=fi');
    expect(response.body.data[2].startStation).toEqual('Kaivopuisto');
  });

  test('Language set to sv returns in swedish', async () => {
    const response = await api.get('/api/trip?language=sv');
    expect(response.body.data[2].startStation).toEqual('Brunnsparken');
  });

  test('Limit set to 2 returns 2 trips', async () => {
    const response = await api.get('/api/trip?limit=2');
    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].startStation).toEqual('Karhupuisto');
    expect(response.body.data[0].distanceMeters).toEqual(5366);
    expect(response.body.data[1].startStation).toEqual('Karhupuisto');
    expect(response.body.data[1].distanceMeters).toEqual(2043);
  });

  test('Ofset set to 2 offsets the returned trips by 2', async () => {
    const response = await api.get('/api/trip?offset=2');
    expect(response.body.data).toHaveLength(3);
    expect(response.body.data[0].startStation).toEqual('Kaivopark');
    expect(response.body.data[0].distanceMeters).toEqual(4010);
    expect(response.body.data[1].startStation).toEqual('Apollonkatu');
    expect(response.body.data[1].distanceMeters).toEqual(3150);
    expect(response.body.data[2].startStation).toEqual('Kaivopark');
    expect(response.body.data[2].distanceMeters).toEqual(1698);
  });
});

afterAll(async () => {
  await Station.destroy({ truncate: true, cascade: true });
  await City.destroy({ truncate: true, cascade: true });
  await Trip.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});