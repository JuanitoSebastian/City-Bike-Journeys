import { parse } from 'csv-parse';
import path from 'path';
import { createReadStream } from 'fs';
import { parseStationData } from './validation';

const parser = parse({
  delimiter: ',',
  from_line: 1
});

const addStations = (filename: string) => {

  parser.on('readable', () => {
    let record: unknown;
    while ((record = parser.read()) !== null) {
      parseStationData(record);
    }
  });

  parser.on('error', (error: Error) => {
    console.log(error);
  });

  parser.on('end', () => {
    console.log('reached end');
  });

  createReadStream(filename).pipe(parser);
};

export const seedDb = () => {
  addStations(path.join(__dirname, '..', '..', 'data', 'stations.csv'));
};