import { readFileSync } from 'fs';
import { parseSeedingYamlObject } from '../validation/seeding';
import YAML from 'yaml';
import SeedingYaml from '../interfaces/SeedingYaml';
import SeedingError from '../errors/SeedingError';

/**
 * Parses seeding.yml file to SeedingYaml object
 * @throws {SeedingError} if .yml contains no stations or trips
 */
export const parseSeedingYaml = (pathToFile: string): SeedingYaml => {
  const file = readFileSync(pathToFile, 'utf8');
  const unsanitizedParsed: unknown = YAML.parse(file);
  const parsed = parseSeedingYamlObject(unsanitizedParsed);

  if (parsed.stations.length === 0 || parsed.trips.length === 0) {
    throw new SeedingError('seeding.yml has to include url to at least one set of stations and trips');
  }

  return parsed;
};