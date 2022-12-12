import { StationData, StringInLanguage, Language, TripData } from "../types";

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect type, not string');
  }

  return text;
};

export const parseStringArray = (unkownArray: unknown): string[] => {
  if (!isArray(unkownArray)) {
    throw new Error('Incorrect type, not array');
  }
  const stringArray = unkownArray.map(text => parseString(text));
  return stringArray;
};

const isArray = (array: unknown): array is [] => {
  return Array.isArray(array);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }

  return date;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

export const parseNumber = (numberToParse: unknown): number => {
  if (!numberToParse || !isNumber(numberToParse)) {
    throw new Error('Incorrect type, not a number');
  }

  return numberToParse;
};

export const parseUnkownArray = (unkownArray: unknown): unknown[] => {
  if (!isArray(unkownArray)) {
    throw new Error('Incorrect type, not array');
  }
  return unkownArray;
};

export const parseStationDataFromCsv = (stationDataRaw: unknown): StationData => {
  const rawDataArray = parseUnkownArray(stationDataRaw);
  if (rawDataArray.length !== 13) {
    throw new Error('Incorrect type, not Station Data');
  }

  const name: StringInLanguage[] = [
    { string: parseString(rawDataArray[2]), langugage: Language.Finnish },
    { string: parseString(rawDataArray[3]), langugage: Language.Swedish },
    { string: parseString(rawDataArray[4]), langugage: Language.Enlgish }
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

export const parseTripDataFormCsv = (tripData: unknown): TripData => {
  const rawDataArray = parseUnkownArray(tripData);
  if (rawDataArray.length !== 8) {
    throw new Error('Incorrect type, not Station Data');
  }
  const tripDataToReturn: TripData = {
    startTime: parseDate(rawDataArray[0]),
    endTime: parseDate(rawDataArray[1]),
    startStationNumber: parseString(rawDataArray[2]),
    startStationName: parseString(rawDataArray[3]),
    endStationNumber: parseString(rawDataArray[4]),
    endStationName: parseString(rawDataArray[5]),
    distanceMeters: Number(parseString(rawDataArray[6])),
    durationSeconds: Number(parseString(rawDataArray[7]))
  };

  return tripDataToReturn;
};