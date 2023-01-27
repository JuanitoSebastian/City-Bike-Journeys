/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { sequelize } from '../services/db';
import supertest from 'supertest';
import app from '../app';
import Seeding from '../models/Seeding';
import SeedingsService from '../services/seedings';

const api = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
});

describe('Seedings endpoint', () => {

  let seeding: Seeding | null;

  test('latestSeeding is null when Seedings table is empty', async () => {
    const response = await api.get('/api/seeding');
    expect(response.body.data.latestSeeding).toBeNull();
  });

  test('latestSeeding is null when Seedings table has entry with finished null', async () => {
    seeding = await SeedingsService.createNewSeeding();
    const response = await api.get('/api/seeding');
    expect(response.body.data.latestSeeding).toBeNull();
  });

  test('latestSeeding returns date when Seedings table has an entry with a finished date', async () => {
    if (seeding) {
      seeding.finished = new Date();
      await seeding.save();

      const response = await api.get('/api/seeding');
      expect(response.body.data.latestSeeding).not.toBeNull();
      expect(new Date(response.body.data.latestSeeding)).toEqual(seeding.finished);
    }
  });
});

afterAll(async () => {
  await Seeding.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});