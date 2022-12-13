import path from 'path';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

import { StringInLanguage, StationData, TripData } from '../types';
import { parseStationDataFromCsv, parseTripDataFormCsv } from './validation';
import * as constants from './constants';

import City from '../models/city';
import CityName from '../models/cityName';
import Station from '../models/station';
import StationName from '../models/stationName';
import StationAddress from '../models/stationAddress';
import Trip from '../models/trip';

const stationIds: string[] = [];

/**
 * Reads a given .csv file and returns the contents in an array.
 * @param filename Path to .csv file
 * @returns Unsanitized array with contents of .csv file
 */
const readCsvFile = async (filename: string): Promise<unknown[]> => {
  const records: unknown[] = [];
  const parser = createReadStream(filename)
    .pipe(parse({ from_line: 2 }));
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

/**
 * Reads Stations from a .csv file and inserts to database
 * @param filename Path to .csv file
 */
const addStations = async (filename: string) => {
  const stationDataRaw = await readCsvFile(filename);
  const stationDataSanitized: StationData[] = stationDataRaw.map(stationRaw => parseStationDataFromCsv(stationRaw));

  for (const stationData of stationDataSanitized) {
    const city = await findOrCreateCity(stationData.city);
    await createStation(stationData, city);
  }
};

/**
 * Finds a city with a given name. If city does not exist, it is created.
 * @param cityNames StringLanguage[] used to find the city object
 * @returns City object
 */
const findOrCreateCity = async (cityNames: StringInLanguage[]): Promise<City> => {
  const cityName = await CityName.findOne({ where: { cityName: cityNames[0].string } });

  if (cityName !== null) {
    const city = await City.findByPk(cityName.cityId);
    if (city === null) throw new Error('Failed to fetch city');
    return city;
  }

  const city = await City.create();

  for (const name of cityNames) {
    await CityName.create({
      cityName: name.string,
      language: name.langugage,
      cityId: city.id
    });
  }

  return city;
};

/**
 * Creates a Station object and saves it in the database.
 * @param stationData StationData used to create the Station
 * @param city City object to associate the station with
 * @returns Station object
 */
const createStation = async (stationData: StationData, city: City): Promise<Station> => {
  const station = await Station.create({
    id: stationData.stationId,
    maximumCapacity: stationData.maximumCapacity,
    cityId: city.id,
    latitude: stationData.latitude,
    longitude: stationData.longitude
  });

  stationIds.push(station.id);

  await StationName.bulkCreate(stationData.name.map((name) => {
    return { name: name.string, language: name.langugage, stationId: station.id };
  }));
  await StationAddress.bulkCreate(stationData.address.map((address) => {
    return { address: address.string, language: address.langugage, stationId: station.id };
  }));

  return station;
};

/**
 * Reads Trips from a .csv file and inserts to database
 * @param filename Path to .csv file
 */
export const addTrips = async (filename: string) => {
  const tripsDataRaw = await readCsvFile(filename);
  // TODO: Maybe refactor this to clearer code?
  const tripsData: TripData[] = tripsDataRaw
  .flatMap((rawData) => {
    try {
      return parseTripDataFormCsv(rawData);
    } catch(error) {
      return [];
    }    
  })
  .filter(tripData => validateTrip(tripData));
  console.log(`Parsed ${tripsData.length} trips from .csv, inserting to db...`);
  try {
    await Trip.bulkCreate(tripsData.map((tripData) => {
      return {
        startTime: tripData.startTime, 
        endTime: tripData.endTime,
        startStationId: tripData.startStationId,
        endStationId: tripData.endStationId,
        distanceMeters: tripData.distanceMeters,
        durationSeconds: tripData.durationSeconds
      };
    }));
  } catch(error) {
    console.log(error);
  }
  console.log('Insertion to db done');
};

/**
 * Checks the validity of a TripData obejct.
 * Valid TripData:
 * - Duration minimum 10 seconds
 * - Covered distance minimum 10 meters
 * - Valid 3 character StataionIds
 * @param trip TripData object to return
 * @returns true / false
 */
const validateTrip = (trip: TripData): boolean => {
  if (trip.startStationId.length < 3 || trip.endStationId.length < 3) {
    return false;
  }

  if (trip.distanceMeters < constants.MIN_TRIP_LENGTH_METERS || trip.durationSeconds < constants.MIN_TRIP_DURATION_SECONDS) {
    return false;
  }

  if (!stationIds.includes(trip.startStationId) || !stationIds.includes(trip.endStationId)) {
    return false;
  }

  return true;
};

/**
 * Seeds the database with data from .csv files. Files used:
 * - /data/stations.csv
 * - /data/2021-05.csv
 * - /data/2021-06.csv
 * - /data/2021-07.csv
 */
export const seedDb = async () => {
  await addStations(path.join(__dirname, '..', '..', 'data', 'stations.csv'));
  await addTrips(path.join(__dirname, '..', '..', 'data', '2021-05.csv'));
  await addTrips(path.join(__dirname, '..', '..', 'data', '2021-06.csv'));
  await addTrips(path.join(__dirname, '..', '..', 'data', '2021-07.csv'));
};