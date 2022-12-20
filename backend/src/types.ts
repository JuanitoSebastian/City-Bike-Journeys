export interface TripData {
  startTime: string;
  endTime: string;
  startStationId: string;
  endStationId: string;
  distanceMeters: number;
  durationSeconds: number;
}

export interface StationData {
  stationId: string;
  name: StringInLanguage[];
  address: StringInLanguage[];
  city: StringInLanguage[];
  maximumCapacity: number;
  latitude: number;
  longitude: number;
}

export interface StringInLanguage {
  string: string;
  langugage: Language;
}

export enum Language {
  Finnish = 'fi',
  English = "en",
  Swedish = "sv"
}