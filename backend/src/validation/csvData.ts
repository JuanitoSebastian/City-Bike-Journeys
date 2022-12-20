import { parseDate, parseString, parseUnkownArray } from "./basicTypes";
import * as constants from '../utils/constants';

import StationData from "../interfaces/StationData";
import StringInLanguage, { Language } from "../interfaces/StringInLanguage";
import TripData from "../interfaces/TripData";

/**
* Parses a StationData obejct from an unknown object generated by csv-parse
* @param stationDataRaw Row from .csv file read by csv-prase
* @throws When a StationData field could not be parsed from unknown
* @returns A StationData object
*/
export const parseStationDataFromCsv = (stationDataRaw: unknown): StationData => {
 const rawDataArray = parseUnkownArray(stationDataRaw);
 if (rawDataArray.length !== 13) {
   throw new Error('Incorrect type, not Station Data');
 }

 const name: StringInLanguage[] = [
   { string: parseString(rawDataArray[2]), langugage: Language.Finnish },
   { string: parseString(rawDataArray[3]), langugage: Language.Swedish },
   { string: parseString(rawDataArray[4]), langugage: Language.English }
 ];

 const address: StringInLanguage[] = [
   { string: parseString(rawDataArray[5]), langugage: Language.Finnish },
   { string: parseString(rawDataArray[6]), langugage: Language.Swedish }
 ];
 const parsedCityString = parseString(rawDataArray[7]);
 const city: StringInLanguage[] = [
   { 
     string: parsedCityString === " " ? "Helsinki" : parseString(rawDataArray[7]), 
     langugage: Language.Finnish 
   },
   { 
     string: parsedCityString === " " ? "Helsingfors" : parseString(rawDataArray[8]), 
     langugage: Language.Swedish 
   }
 ];

 const stationDataToReturn: StationData = {
   stationId: parseString(rawDataArray[1]),
   name: name,
   address: address,
   city: city,
   maximumCapacity: Number(parseString(rawDataArray[10])),
   latitude: Number(parseString(rawDataArray[11])),
   longitude: Number(parseString(rawDataArray[12]))
 };

 return stationDataToReturn;
};

/**
* Parses a TripData obejct from an unknown object generated by csv-parse
* @param rawTripData Row from .csv file read by csv-parse
* @throws When a TripData field could not be parsed from unknown
* @returns A TripData object
*/
export const parseTripDataFormCsv = (rawTripData: unknown): TripData => {
 const rawDataArray = parseUnkownArray(rawTripData);
 if (rawDataArray.length !== 8) {
   throw new Error('Incorrect type, not Station Data');
 }
 const tripDataToReturn: TripData = {
   startTime: parseDate(rawDataArray[0]),
   endTime: parseDate(rawDataArray[1]),
   startStationId: parseString(rawDataArray[2]),
   endStationId: parseString(rawDataArray[4]),
   distanceMeters: Number(parseString(rawDataArray[6])),
   durationSeconds: Number(parseString(rawDataArray[7]))
 };

 return tripDataToReturn;
};

/**
* Checks the validity of a TripData obejct.
* Valid TripData:
* - Duration minimum 10 seconds
* - Covered distance minimum 10 meters
* - Valid 3 character StataionIds
* - Trip starts and ends at a valid bike station
* @param trip TripData object to validate
* @param addedStationsIds A list of valid stationIds
* @returns true / false
*/
export const validateTrip = (trip: TripData, addedStationIds: string[]): boolean => {
 if (trip.startStationId.length < 3 || trip.endStationId.length < 3) {
   return false;
 }

 if (trip.distanceMeters < constants.MIN_TRIP_LENGTH_METERS || trip.durationSeconds < constants.MIN_TRIP_DURATION_SECONDS) {
   return false;
 }

 if (!addedStationIds.includes(trip.startStationId) || !addedStationIds.includes(trip.endStationId)) {
   return false;
 }

 return true;
};