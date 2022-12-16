import { validateTrip, parseTripDataFormCsv } from '../utils/validation';
import { TripData } from '../types';

describe('CSV parsing', () => {

  describe('TripData', () => {

    test('Length non valid throws', () => {
      const shortTripData: unknown[] = [
        '2021-05-31T23:57:25',
        '2021-06-01T00:05:46',
        '094',
        'Laajalahden aukio'
      ];

      const longTripData: unknown[] = [
        '2021-05-31T23:56:11',
        '2021-06-01T00:02:02',
        '004',
        'Viiskulma',
        '065',
        'Hernesaarenranta',
        '1400',
        '350',
        '2021-05-31T23:54:48'
      ];

      expect(() => { parseTripDataFormCsv(shortTripData); }).toThrow(Error);
      expect(() => { parseTripDataFormCsv(longTripData); }).toThrow(Error);
    });

    test('Valid data returns corresponding TripData obejct', () => {
      const rawTripData: unknown[] = [
        '2021-05-31T23:56:11',
        '2021-06-01T00:02:02',
        '004',
        'Viiskulma',
        '065',
        'Hernesaarenranta',
        '1400',
        '350'
      ];

      const tripDataObject = parseTripDataFormCsv(rawTripData);
      expect(tripDataObject.startTime.toString()).toEqual(rawTripData[0]);
      expect(tripDataObject.endTime.toString()).toEqual(rawTripData[1]);
      expect(tripDataObject.startStationId.toString()).toEqual(rawTripData[2]);
      expect(tripDataObject.endStationId.toString()).toEqual(rawTripData[4]);
      expect(tripDataObject.distanceMeters).toEqual(1400);
      expect(tripDataObject.durationSeconds).toEqual(350);
    });
    
  });
});

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

    expect(validateTrip(distanceTooShort, stationIds)).toBeFalsy();
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
    
    expect(validateTrip(durationTooShort, stationIds)).toBeFalsy();
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

    expect(validateTrip(foreigStartStationId, stationIds)).toBeFalsy();
    expect(validateTrip(foreigEndStationId, stationIds)).toBeFalsy();
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

    expect(validateTrip(validTrip, stationIds)).toBeTruthy();
  });
});