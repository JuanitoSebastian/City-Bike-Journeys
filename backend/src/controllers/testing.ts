import express, { Request, Response, RequestHandler} from 'express';
import TestHelper from '../tests/helper';


/**
 * These routes are used for testing and are only accessible only when
 * NODE_ENV is set to test.
 */
const router = express.Router();

/**
 * Add test data with trips and stations to database
 */
router.post('/trips', (async (_request: Request, response: Response) => {
  await TestHelper.seedTestDataToDb();

  response.status(200).send();
}) as RequestHandler);

/**
 * Mark database as seeded
 */
router.post('/seedings', (async (_request: Request, response: Response) => {
  await TestHelper.markDatabaseAsSeeded();

  response.status(200).send();
}) as RequestHandler);

/**
 * Reset db tables
 */
router.post('/reset', (async (_request: Request, response: Response) => {
  await TestHelper.clearDatabaseTables();

  response.status(200).send();
}) as RequestHandler);

export default router;