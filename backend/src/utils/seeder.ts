import path from 'path';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

import TripData from '../interfaces/TripData';
import StringInLanguage from '../interfaces/StringInLanguage';
import StationData from '../interfaces/StationData';
import { parseStationDataFromCsv, parseTripDataFormCsv, validateTrip } from '../validation/csvData';

import City from '../models/city';
import CityName from '../models/cityName';
import Station from '../models/station';
import StationName from '../models/stationName';
import StationAddress from '../models/stationAddress';
import Trip from '../models/trip';
import { Op } from 'sequelize';

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
 * Validates and adds station data from an unkown[].
 * @param stationsDataRaw Raw station data parsed by csv-parse
 * @returns The station ids that were added to the db (promise)
 */
const addStations = async (stationsDataRaw: unknown[]): Promise<string[]> => {
  const addedStationIds: string[] = [];
  const stationDataSanitized: StationData[] = stationsDataRaw.map(stationRaw => parseStationDataFromCsv(stationRaw));

  for (const stationData of stationDataSanitized) {
    const city = await findOrCreateCity(stationData.city);
    const station = await createStation(stationData, city);
    addedStationIds.push(station.id);
  }

  return addedStationIds;
};

/**
 * Finds a city with a given name. If city does not exist, it is created.
 * @param cityNames StringLanguage[] used to find the city object
 * @returns City object (promise)
 */
const findOrCreateCity = async (cityNames: StringInLanguage[]): Promise<City> => {
  const cityFromDb = await City.findOne({ 
    include: { 
      model: CityName, 
      where: {
        cityName: {
          [Op.eq]: cityNames[0].string
        }
      }
    }
  });

  if (cityFromDb !== null) {
    return cityFromDb;
  }

  const newCity = await City.create({
    names: cityNames.map((cityNameData) => { return { cityName: cityNameData.string, language: cityNameData.langugage }; })
  }, { 
    include: [CityName] 
  });

  return newCity;
};

/**
 * Creates a Station object and saves it in the database.
 * @param stationData StationData used to create the Station
 * @param city City object to associate the station with
 * @returns Station object (promise)
 */
const createStation = async (stationData: StationData, city: City): Promise<Station> => {
  const station = await Station.create({
    id: stationData.stationId,
    maximumCapacity: stationData.maximumCapacity,
    cityId: city.id,
    latitude: stationData.latitude,
    longitude: stationData.longitude,
    names: stationData.name.map((name) => { return { name: name.string, language: name.langugage }; }),
    addresses: stationData.address.map((address) => { return { address: address.string, language: address.langugage }; })
  }, {
    include: [StationName, StationAddress]
  });

  return station;
};

/**
 * Validates and adds trip data from an unkown[]. A list of valid station ids
 * must be provided. A valid trip must start from a valid bike station
 * @param tripsDataRaw Raw trip data parsed by csv-parse
 * @param validStationIds A list of valid station ids
 */
const addTrips = async (tripsDataRaw: unknown[], validStationIds: string[]) => {
  // TODO: Maybe refactor this to clearer code?
  const tripsData: TripData[] = tripsDataRaw
    .flatMap((rawData) => {
      try {
        return parseTripDataFormCsv(rawData);
      } catch (error) {
        return [];
      }
    })
    .filter(tripData => validateTrip(tripData, validStationIds));
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
  } catch (error) {
    console.log(error);
  }
  console.log('Insertion to db done');
};

/**
 * Seeds the database with data from .csv files. Files used:
 * - /data/stations.csv
 * - /data/2021-05.csv
 * - /data/2021-06.csv
 * - /data/2021-07.csv
 */
export const seedDb = async () => {
  const stationsDataRaw = await readCsvFile(path.join(__dirname, '..', '..', 'data', 'stations.csv'));
  const addedStationIds = await addStations(stationsDataRaw);

  const tripsPaths = [
    path.join(__dirname, '..', '..', 'data', '2021-05.csv'),
    path.join(__dirname, '..', '..', 'data', '2021-06.csv'),
    path.join(__dirname, '..', '..', 'data', '2021-07.csv')
  ];

  for (const pathToTrips of tripsPaths) {
    const rawTripsData = await readCsvFile(pathToTrips);
    await addTrips(rawTripsData, addedStationIds);
  }
};

export const exportForTesting = {
  addStations,
  addTrips
};