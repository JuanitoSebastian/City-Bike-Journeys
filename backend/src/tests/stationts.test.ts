import { sequelize } from '../services/db';
import supertest from 'supertest';
import TestHelper from './helper';
import app from '../app';

const api = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
  await TestHelper.seedTestDataToDb();
});

describe('Stations endpoint', () => {

  describe('Multiple', () => {
    test('All stations are returned', async () => {
      const reponse = await api.get('/station');
      expect(reponse.body.data).toHaveLength(3);
    });
  
    test('Stations sorted by id on default', async () => {
      const response = await api.get('/station');
      expect(response.body.data[0].id).toEqual('001');
      expect(response.body.data[1].id).toEqual('036');
      expect(response.body.data[2].id).toEqual('043');
    });
  
    test('Stations sorted by name when order_by parameter is name', async () => {
      const response = await api.get('/station?order_by=name');
      expect(response.body.data[0].name).toEqual('Apollonkatu');
      expect(response.body.data[1].name).toEqual('Kaivopark');
      expect(response.body.data[2].name).toEqual('Karhupuisto');
    });
  
    test('Stations sort order descending when order is DESC', async () => {
      const response = await api.get('/station?order=DESC');
      expect(response.body.data[0].id).toEqual('043');
      expect(response.body.data[1].id).toEqual('036');
      expect(response.body.data[2].id).toEqual('001');
    });
  
    test('Limit returns correct amount of stations', async () => {
      const response = await api.get('/station?limit=2');
      expect(response.body.data[0].id).toEqual('001');
      expect(response.body.data[1].id).toEqual('036');
      expect(response.body.data).toHaveLength(2);
    });
  
    test('Offset returns correct of stations', async () => {
      const response = await api.get('/station?limit=2&offset=1');
      expect(response.body.data[0].id).toEqual('036');
      expect(response.body.data[1].id).toEqual('043');
      expect(response.body.data).toHaveLength(2);
    });
  });
  
  describe('Single', () => {
    test('Valid id returns station', async () => {
      const reponse = await api.get('/station/001');
      expect(reponse.body.data.id).toEqual('001');
      expect(reponse.body.data.name).toEqual('Kaivopark');
      expect(reponse.body.data.address).toEqual('Meritori 1');
      expect(reponse.body.data.city).toEqual('Helsinki');
      expect(reponse.body.data.maximumCapacity).toEqual(30);
      expect(reponse.body.data.latitude).toEqual(24.950211);
      expect(reponse.body.data.longitude).toEqual(60.155370);
    });

    test('Language set to sv returns station in swedish', async () => {
      const reponse = await api.get('/station/001?language=sv');
      expect(reponse.body.data.id).toEqual('001');
      expect(reponse.body.data.name).toEqual('Brunnsparken');
      expect(reponse.body.data.address).toEqual('Havstorget 1');
      expect(reponse.body.data.city).toEqual('Helsingfors');
      expect(reponse.body.data.maximumCapacity).toEqual(30);
      expect(reponse.body.data.latitude).toEqual(24.950211);
      expect(reponse.body.data.longitude).toEqual(60.155370);
    });

    test('Language set to fi returns station in finnish', async () => {
      const reponse = await api.get('/station/001?language=fi');
      expect(reponse.body.data.id).toEqual('001');
      expect(reponse.body.data.name).toEqual('Kaivopuisto');
      expect(reponse.body.data.address).toEqual('Meritori 1');
      expect(reponse.body.data.city).toEqual('Helsinki');
      expect(reponse.body.data.maximumCapacity).toEqual(30);
      expect(reponse.body.data.latitude).toEqual(24.950211);
      expect(reponse.body.data.longitude).toEqual(60.155370);
    });

    test('Nonexistent station id returns 404', async () => {
      await api.get('/station/003').expect(404);
    });

    test('Unvalid station id returns 400', async () => {
      await api.get('/station/rautatientori').expect(400);
    });
  });

  describe('Statistics', () => {
    test('counts calculated correctly', async () => {
      const statsStation001 = await api.get('/station/001/statistics');
      expect(statsStation001.body.data.arrivalsCount).toEqual(1);
      expect(statsStation001.body.data.departuresCount).toEqual(2);

      const statsStation036 = await api.get('/station/036/statistics');
      expect(statsStation036.body.data.arrivalsCount).toEqual(2);
      expect(statsStation036.body.data.departuresCount).toEqual(1);

      const statsStation043 = await api.get('/station/043/statistics');
      expect(statsStation043.body.data.arrivalsCount).toEqual(2);
      expect(statsStation043.body.data.departuresCount).toEqual(2);
    });

    test('averages calculated correctly', async () => {
      const statsStation001 = await api.get('/station/001/statistics');
      // 2043 / 1 = 2043
      expect(statsStation001.body.data.arrivalsAverageDistance).toEqual(2043);
      // (4010 + 1698) / 2 = 2854
      expect(statsStation001.body.data.departuresAverageDistance).toEqual(2854);

      const statsStation036 = await api.get('/station/036/statistics');
      // (5366 + 4010) / 2 = 4688
      expect(statsStation036.body.data.arrivalsAverageDistance).toEqual(4688);
      // 3150 / 1 = 3150
      expect(statsStation036.body.data.departuresAverageDistance).toEqual(3150);

      const statsStation043 = await api.get('/station/043/statistics');
      // (3150 + 1698) / 2 = 4688
      expect(statsStation043.body.data.arrivalsAverageDistance).toEqual(2424);
      // (2043 + 5366) / 2 = 3704.5
      expect(statsStation043.body.data.departuresAverageDistance).toEqual(3704.5);
    });

    test('filtering by date returns statistics from correct timerange', async () => {
      const statsStation043 = await api.get('/station/043/statistics?start_date=2021-05-31T22:00:00&end_date=2021-06-01T11:00:00');
      expect(statsStation043.body.data.arrivalsCount).toEqual(0);
      expect(statsStation043.body.data.arrivalsAverageDistance).toBeNull();
      expect(statsStation043.body.data.departuresCount).toEqual(2);
      // (2043 + 5366) / 2 = 3704.5
      expect(statsStation043.body.data.departuresAverageDistance).toEqual(3704.5);
    });

    test('filtering by date with an invalid timerange returns 400', async () => {
      // Start time before end time
      await api.get('/station/043/statistics?start_date=2021-06-01T11:00:00&end_date=2021-05-31T22:00:00').expect(400);
    });

    test('Nonexistent station id returns 404', async () => {
      await api.get('/station/003/statistics').expect(404);
    });

    test('Unvalid station id returns 400', async () => {
      await api.get('/station/rautatientori/statistics').expect(400);
    });

  });

});

afterAll(async () => {
  await TestHelper.clearDatabaseTables();
  await sequelize.close();
});