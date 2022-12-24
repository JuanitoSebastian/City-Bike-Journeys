import { sequelize } from '../services/db';
import Station from '../models/station';
import Trip from '../models/trip';
import { exportForTesting as seeder } from '../utils/seeder';
import City from '../models/city';
import StationName from '../models/stationName';
import StationAddress from '../models/stationAddress';
import CityName from '../models/cityName';

beforeAll(async () => {
  await sequelize.sync();
});

const stationsDataRawValid = [
  [
    '1',
    '501',
    'Hanasaari',
    'Hanaholmen',
    'Hanasaari',
    'Hanasaarenranta 1',
    'Hanaholmsstranden 1',
    'Espoo',
    'Esbo',
    'CityBike Finland',
    '10',
    '24.840319',
    '60.16582'
  ],
  [
    '2',
    '503',
    'Keilalahti',
    'Kägelviken',
    'Keilalahti',
    'Keilalahdentie 2',
    'Kägelviksvägen 2',
    'Espoo',
    'Esbo',
    'CityBike Finland',
    '28',
    '24.827467',
    '60.171524'
  ]
];

const tripDataRawValid = [
  [
    '2021-05-31T23:57:25',
    '2021-06-01T00:05:46',
    '501',
    'Hanasaari',
    '503',
    'Keilalahti',
    '2043',
    '500'
  ],
  [
    '2021-05-31T23:56:59',
    '2021-06-01T00:07:14',
    '503',
    'Keilalahti',
    '501',
    'Hanasaari',
    '1870',
    '611'
  ]
];

describe('Adding stations', () => {
  afterEach(async () => {
    await Station.destroy({ truncate: true, cascade: true });
    await City.destroy({ truncate: true, cascade: true });
  });

  test('Valid stations are added to DB', async () => {
    await seeder.addStations(stationsDataRawValid);
    const stationFromDb = await Station.findOne();
    expect(await Station.count()).toEqual(2);
    expect(await City.count()).toEqual(1);
    expect(await StationName.count()).toEqual(6);
    expect(await StationAddress.count()).toEqual(4);
    expect(await CityName.count()).toEqual(2);
    expect(stationFromDb).not.toBeNull();
  });
});

describe('Adding trips', () => {
  beforeEach(async () => {
    await seeder.addStations(stationsDataRawValid);
  });

  afterEach(async () => {
    await Station.destroy({ truncate: true, cascade: true });
    await Trip.destroy({ truncate: true, cascade: true });
    await City.destroy({ truncate: true, cascade: true });
  });

  test('Valid trips are added to DB', async () => {
    await seeder.addTrips(tripDataRawValid, ['501', '503']);
    expect(await Trip.count()).toEqual(2);
  });

  test('Trip from unvalid station not added to DB', async () => {
    const unvalidTripData = [
      '2021-05-31T23:56:23',
      '2021-06-01T00:29:58',
      '501',
      'Hanasaari',
      '065',
      'Hernesaarenranta',
      '2043',
      '500'
    ];
    await seeder.addTrips([...tripDataRawValid, unvalidTripData], ['501', '503']);
    expect(await Trip.count()).toEqual(2);
  });
});

afterAll(async () => {
  await sequelize.close();
});