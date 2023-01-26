export interface TripResponseData {
  id: number;
  startTime: Date;
  endTime: Date;
  startStation: string;
  endStation: string;
  distanceMeters: number;
  durationSeconds: number;
}

export default TripResponseData;