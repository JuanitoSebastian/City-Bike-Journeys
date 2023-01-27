import path from 'path';
import { readFile } from 'fs';

import TripData from '../interfaces/TripData';
import StringInLanguage from '../interfaces/StringInLanguage';
import StationData from '../interfaces/StationData';
import { parseStationDataFromCsv, parseTripDataFormCsv, validateTrip } from '../validation/csvData';

import City from '../models/City';
import CityName from '../models/CityName';
import Station from '../models/Station';
import StationName from '../models/StationName';
import StationAddress from '../models/StationAddress';
import Trip from '../models/Trip';
import { Op } from 'sequelize';
import SeedingsService from '../services/seedings';

/**
 * Reads a given .csv file and returns the contents in an array. 
 * A set is used to get rid of duplicate values. Funciton skips
 * first row (header) of the .csv file.
 * @param filename Path to .csv file
 * @returns Unsanitized array with contents of .csv file
 */
const readCsvFile = (filename: string): Promise<unknown[]> => {
  const records: unknown[] = [];
  return new Promise(resolve => {
    readFile(filename, (error, data) => {
      if (error) {
        console.log(error);
        resolve([]);
        return;
      }

      const file = [...new Set(data.toString().split('\n'))];
      for (const [index, row] of file.entries()) {
        if (index === 0) { continue; }
        records.push(row.split(','));
      }
      resolve(records);
    });
  });
};

/**
 * Validates and adds station data from an unkown[].
 * @param stationsDataRaw Raw station data parsed by csv-parse
 * @returns The station ids that were added to the db (promise)
 */
const addStations = async (stationsDataRaw: unknown[]): Promise<string[]> => {
  const addedStationIds: string[] = [];
  const stationDataSanitized: StationData[] = stationsDataRaw.flatMap(stationRaw => {
    try {
      return parseStationDataFromCsv(stationRaw);
    } catch (error) {
      return [];
    }
  });

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
  const tripsData: TripData[] = tripsDataRaw
    .flatMap((rawData) => {
      try {
        return parseTripDataFormCsv(rawData);
      } catch (error) {
        return [];
      }
    })
    .filter(tripData => validateTrip(tripData, validStationIds));

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
};

/**
 * Seeds the database with data from .csv files. Files used:
 * - /data/stations.csv
 * - /data/2021-05.csv
 * - /data/2021-06.csv
 * - /data/2021-07.csv
 */
export const seedDb = async () => {
  const seeding = await SeedingsService.createNewSeeding();

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

  seeding.finished = new Date();
  await seeding.save();
};

export const exportForTesting = {
  addStations,
  addTrips
};