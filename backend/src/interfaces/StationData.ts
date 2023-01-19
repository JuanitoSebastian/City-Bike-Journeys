import StringInLanguage from './StringInLanguage';

export interface StationData {
  stationId: string;
  name: StringInLanguage[];
  address: StringInLanguage[];
  city: StringInLanguage[];
  maximumCapacity: number;
  latitude: number;
  longitude: number;
}

export default StationData;