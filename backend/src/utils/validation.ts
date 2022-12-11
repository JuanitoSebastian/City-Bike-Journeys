import { StationData } from "../types";

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

export const parseStationData = (stationData: unknown): StationData => {
  const stationDataArray = parseUnkownArray(stationData);
  if (stationDataArray.length !== 13) {
    throw new Error('Incorrect type, not Station Data');
  }

  const stationDataToReturn: StationData = {
    stationId: parseString(stationDataArray[1]),
    nameFinnish: parseString(stationDataArray[2]),
    nameEnglish: parseString(stationDataArray[3]),
    nameSwedish: parseString(stationDataArray[4]),
    addressFinnish: parseString(stationDataArray[5]),
    addressSwedish: parseString(stationDataArray[6]),
    cityFinnish: parseString(stationDataArray[7]),
    citySwedish: parseString(stationDataArray[8]),
    operator: parseString(stationDataArray[9]),
    maximumCapacity: Number(parseString(stationDataArray[10])),
    latitude: Number(parseString(stationDataArray[11])),
    longitude: Number(parseString(stationDataArray[12]))
  };

  return stationDataToReturn;
};