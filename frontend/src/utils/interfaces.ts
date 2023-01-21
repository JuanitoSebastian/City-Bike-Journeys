
export interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  maximumCapacity: number;
  latitude: number;
  longitude: number;
  statistics?: StationStatistics;
};

export interface StationStatistics {
  arrivalsCount: number;
  departuresCount: number;
  arrivalsAverageDistance: number;
  departuresAverageDistance: number;
};

export interface Trip {
  id: number;
  startTime: string;
  endTime: string;
  startStation: string;
  endStation: string;
  distanceMeters: number;
  durationSeconds: number;
};

export interface PagingDetails {
  total: number;
  page: number;
  pages: number;
};

export interface ApiResponsePagingDetails {
  data: unknown;
  paging: PagingDetails;
};

export type ApiReponse = Omit<ApiResponsePagingDetails, 'paging'>;

export type IconType = 'bolt'|'flag'|'cog'|'info';