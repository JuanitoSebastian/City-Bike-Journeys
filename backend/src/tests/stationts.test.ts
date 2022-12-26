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

describe('Stations endpoint', () => {

  describe('Multiple', () => {
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
  
    test('Stations sorted by name when order_by parameter is name', async () => {
      const response = await api.get('/api/station?order_by=name');
      expect(response.body.data[0].name).toEqual('Apollonkatu');
      expect(response.body.data[1].name).toEqual('Kaivopark');
      expect(response.body.data[2].name).toEqual('Karhupuisto');
    });
  
    test('Stations sort order descending when order is DESC', async () => {
      const response = await api.get('/api/station?order=DESC');
      expect(response.body.data[0].id).toEqual('043');
      expect(response.body.data[1].id).toEqual('036');
      expect(response.body.data[2].id).toEqual('001');
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
  
  describe('Single', () => {
    test('Valid id returns station', async () => {
      const reponse = await api.get('/api/station/001');
      expect(reponse.body.data.id).toEqual('001');
      expect(reponse.body.data.name).toEqual('Kaivopark');
      expect(reponse.body.data.address).toEqual('Meritori 1');
      expect(reponse.body.data.city).toEqual('Helsinki');
      expect(reponse.body.data.maximumCapacity).toEqual(30);
      expect(reponse.body.data.latitude).toEqual('24.950211');
      expect(reponse.body.data.longitude).toEqual('60.155370');
    });

    test('Language set to sv returns station in swedish', async () => {
      const reponse = await api.get('/api/station/001?language=sv');
      expect(reponse.body.data.id).toEqual('001');
      expect(reponse.body.data.name).toEqual('Brunnsparken');
      expect(reponse.body.data.address).toEqual('Havstorget 1');
      expect(reponse.body.data.city).toEqual('Helsingfors');
      expect(reponse.body.data.maximumCapacity).toEqual(30);
      expect(reponse.body.data.latitude).toEqual('24.950211');
      expect(reponse.body.data.longitude).toEqual('60.155370');
    });

    test('Language set to fi returns station in finnish', async () => {
      const reponse = await api.get('/api/station/001?language=fi');
      expect(reponse.body.data.id).toEqual('001');
      expect(reponse.body.data.name).toEqual('Kaivopuisto');
      expect(reponse.body.data.address).toEqual('Meritori 1');
      expect(reponse.body.data.city).toEqual('Helsinki');
      expect(reponse.body.data.maximumCapacity).toEqual(30);
      expect(reponse.body.data.latitude).toEqual('24.950211');
      expect(reponse.body.data.longitude).toEqual('60.155370');
    });

    test('Nonexistent station id returns 404', async () => {
      await api.get('/api/station/003').expect(404);
    });

    test('Unvalid station id returns 400', async () => {
      await api.get('/api/station/rautatientori').expect(400);
    });
    
  });

});

afterAll(async () => {
  await Station.destroy({ truncate: true, cascade: true });
  await City.destroy({ truncate: true, cascade: true });
  await Trip.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});