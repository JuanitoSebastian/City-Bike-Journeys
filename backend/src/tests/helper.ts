import City from "../models/city";
import CityName from "../models/cityName";
import Station from "../models/station";
import StationAddress from "../models/stationAddress";
import StationName from "../models/stationName";
import Trip from "../models/trip";

const seedTestDataToDb = async () => {
  const city = await City.create({
    names: [{ cityName: 'Helsinki', language: 'fi'}, { cityName: 'Helsingfors', language: 'sv' }]
  }, { 
    include: [CityName] 
  });

  const stationKarhupuisto = await Station.create({
    id: '043',
    maximumCapacity: 24,
    cityId: city.id,
    longitude: 60.184283,
    latitude: 24.952676,
    names: [
      { name: 'Karhupuisto', language: 'fi' },
      { name: 'Karhupuisto', language: 'en' },
      { name: 'Björnparken', language: 'sv' }
    ],
    addresses: [
      { address: 'Agricolankatu 11', language: 'fi' },
      { address: 'Agricolagatan 11', language: 'sv' }
    ]
  }, {
    include: [StationAddress, StationName]
  });

  const stationKaivopuisto = await Station.create({
    id: '001',
    maximumCapacity: 30,
    cityId: city.id,
    longitude: 60.155370,
    latitude: 24.950211,
    names: [
      { name: 'Kaivopuisto', language: 'fi' },
      { name: 'Kaivopark', language: 'en' },
      { name: 'Brunnsparken', language: 'sv' }
    ],
    addresses: [
      { address: 'Meritori 1', language: 'fi' },
      { address: 'Havstorget 1', language: 'sv' }
    ]
  }, {
    include: [StationAddress, StationName]
  });

  const stationApollonkatu = await Station.create({
    id: '036',
    maximumCapacity: 36,
    cityId: city.id,
    longitude: 60.176093,
    latitude: 24.922463,
    names: [
      { name: 'Apollonkatu', language: 'fi' },
      { name: 'Apollonkatu', language: 'en' },
      { name: 'Apollogatan', language: 'sv' }
    ],
    addresses: [
      { address: 'Runeberginkatu 43', language: 'fi' },
      { address: 'Runebergsgatan 43', language: 'sv' }
    ]
  }, {
    include: [StationAddress, StationName]
  });

  await Trip.bulkCreate([
    { 
      startTime: '2021-05-31T23:57:25', 
      endTime: '2021-06-01T00:05:46', 
      startStationId: stationKarhupuisto.id, 
      endStationId: stationKaivopuisto.id,
      distanceMeters: 2043,
      durationSeconds: 500
    },
    { 
      startTime: '2021-05-31T23:53:04', 
      endTime: '2021-06-01T00:14:52', 
      startStationId: stationKarhupuisto.id, 
      endStationId: stationApollonkatu.id,
      distanceMeters: 5366,
      durationSeconds: 1304
    },
    { 
      startTime: '2021-06-30T23:59:25', 
      endTime: '2021-07-01T00:22:15', 
      startStationId: stationKaivopuisto.id, 
      endStationId: stationApollonkatu.id,
      distanceMeters: 4010,
      durationSeconds: 1366
    },
    { 
      startTime: '2021-07-31T23:59:01', 
      endTime: '2021-08-01T00:09:56', 
      startStationId: stationApollonkatu.id, 
      endStationId: stationKarhupuisto.id,
      distanceMeters: 3150,
      durationSeconds: 649
    },
    { 
      startTime: '2021-07-31T23:59:22', 
      endTime: '2021-08-01T00:06:14', 
      startStationId: stationKaivopuisto.id, 
      endStationId: stationKarhupuisto.id,
      distanceMeters: 1698,
      durationSeconds: 410
    }
  ]);
};

export default {
  seedTestDataToDb
};