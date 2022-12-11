export interface TripData {
  startTime: string;
  endTime: string;
  startStationId: number;
  startStationName: string;
  endStationId: number;
  endStationName: string;
  distanceMeters: number;
  durationSeconds: number;
}

export interface StationData {
  stationId: string;
  nameFinnish: string;
  nameEnglish: string;
  nameSwedish: string;
  addressFinnish: string;
  addressSwedish: string;
  cityFinnish: string;
  citySwedish: string;
  operator: string;
  maximumCapacity: number;
  latitude: number;
  longitude: number;
}