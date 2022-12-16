import { exportedFortesting as seeder } from '../utils/seeder';
import { TripData } from '../types';

describe('Trip validation', () => {

  const stationIds = ['074', '075', '076', '115', '228'];

  test('Distance less than 10 returns false', () => {
    const distanceTooShort: TripData = {
      startStationId: stationIds[0],
      endStationId: stationIds[1],
      startTime: Date.now().toString(),
      endTime: Date.now().toString(),
      distanceMeters: 5,
      durationSeconds: 30
    };

    expect(seeder.validateTrip(distanceTooShort, stationIds)).toBeFalsy();
  });

  test('Duration less than 10 returns false', () => {
    const durationTooShort: TripData = {
      startStationId: stationIds[2],
      endStationId: stationIds[1],
      startTime: Date.now().toString(),
      endTime: Date.now().toString(),
      distanceMeters: 500,
      durationSeconds: 4
    };
    
    expect(seeder.validateTrip(durationTooShort, stationIds)).toBeFalsy();
  });

  test('Foreign station id returns false', () => {
    const foreigStartStationId: TripData = {
      startStationId: '073',
      endStationId: stationIds[4],
      startTime: Date.now().toString(),
      endTime: Date.now().toString(),
      distanceMeters: 500,
      durationSeconds: 100
    };

    const foreigEndStationId: TripData = {
      startStationId: stationIds[3],
      endStationId: '220',
      startTime: Date.now().toString(),
      endTime: Date.now().toString(),
      distanceMeters: 500,
      durationSeconds: 412
    };

    expect(seeder.validateTrip(foreigStartStationId, stationIds)).toBeFalsy();
    expect(seeder.validateTrip(foreigEndStationId, stationIds)).toBeFalsy();
  });

  test('Valid TripData returns true', () => {
    const validTrip: TripData = {
      startStationId: stationIds[0],
      endStationId: stationIds[4],
      startTime: Date.now().toString(),
      endTime: Date.now().toString(),
      distanceMeters: 15,
      durationSeconds: 10
    };

    expect(seeder.validateTrip(validTrip, stationIds)).toBeTruthy();
  });
});