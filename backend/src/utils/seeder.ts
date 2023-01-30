import { readFile, unlinkSync } from 'fs';
import Downloader from 'nodejs-file-downloader';

import TripData from '../interfaces/TripData';
import StringInLanguage from '../interfaces/StringInLanguage';
import StationData from '../interfaces/StationData';
import { parseStationDataFromCsv, parseTripDataFormCsv, validateTrip } from '../validation/seeding';
import { DEFAULT_DIRECTORY_FOR_SEEDING_DATA, DEFAULT_PATH_TO_SEEDING_YAML } from './constants';
import SeedingsService from '../services/seedings';
import SeedingError from '../errors/SeedingError';

import City from '../models/City';
import CityName from '../models/CityName';
import Station from '../models/Station';
import StationName from '../models/StationName';
import StationAddress from '../models/StationAddress';
import Trip from '../models/Trip';
import { Op } from 'sequelize';
import { parseSeedingYaml } from './yamlParser';

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
 * Downloads given files files to data directory
 * @param urlsToFiles A list of urls of files to download
 * @returns Returns a list containing the paths of the downloaded files
 */
const downloadFiles = async (urlsToFiles: string[]): Promise<string[]> => {
  const pathsToFiles: string[] = [];
  for (const urlToFile of urlsToFiles) {
    const downloader = new Downloader({
      url: urlToFile,
      directory: DEFAULT_DIRECTORY_FOR_SEEDING_DATA
    });

    try {
      const downloadReport = await downloader.download();
      if (downloadReport.downloadStatus === 'COMPLETE' && downloadReport.filePath) {
        pathsToFiles.push(downloadReport.filePath);
      }
    } catch(error) {
      console.log(`Error downloading file ${urlToFile}`);
      console.log(error);
    }
  }
  return pathsToFiles;
};

/**
 * Deletes given files
 * @param pathsToFiles paths of files to delete
 */
const deleteFiles = (pathsToFiles: string[]) => {
  for (const path of pathsToFiles) {
    try {
      unlinkSync(path);
    } catch {
      console.log(`Failed to delete file: ${path}`);
    }
  }
};

/**
 * Seeds the database with data from downloaded .csv files.
 * @throws {SeedingError} If no stations are downloaded
 */
export const seedDb = async () => {
  const seeding = await SeedingsService.createNewSeeding();
  const seedingYaml = parseSeedingYaml(DEFAULT_PATH_TO_SEEDING_YAML);

  const stationsPaths = await downloadFiles(seedingYaml.stations);
  const tripsPaths = await downloadFiles(seedingYaml.trips);

  if (stationsPaths.length === 0 || tripsPaths.length === 0) {
    throw new SeedingError('Seeding data has to include at least one set of stations and trips');
  }
  
  const stationsDataRaw = await readCsvFile(stationsPaths[0]);
  const addedStationIds = await addStations(stationsDataRaw);

  for (const pathToTrips of tripsPaths) {
    const rawTripsData = await readCsvFile(pathToTrips);
    await addTrips(rawTripsData, addedStationIds);
  }

  deleteFiles([stationsPaths, tripsPaths].flat());

  seeding.finished = new Date();
  await seeding.save();

};

export const exportForTesting = {
  addStations,
  addTrips
};