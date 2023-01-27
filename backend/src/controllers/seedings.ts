import express, { Request, Response, RequestHandler} from 'express';
import SeedingsResponseData from '../interfaces/SeedingsResponseData';
import SeedingsService from '../services/seedings';

const router = express.Router();

/**
 * Returns date of latest seeding of DB. If DB has not been seeded,
 * a null value is sent.
 */
router.get('/', (async (_request: Request, response: Response) => {
  const latestSeeding = await SeedingsService.getLatestSeeding();
  const latestSeedingFinished: Date|null = latestSeeding ? latestSeeding.finished : null;
  const seedingsResponse: SeedingsResponseData = {
    latestSeeding: latestSeedingFinished ? latestSeedingFinished.toISOString() : null
  };

  response.json({ data: seedingsResponse });
}) as RequestHandler);

export default router;