import Seeding from '../models/Seeding';
import { Op } from 'sequelize';

/**
 * Returns the Seeding entry that has been most recently started
 */
const getLatestSeeding = async (): Promise<Seeding|null> => {
  const seeding = await Seeding.findOne({
    where: {
      finished:  {
        [Op.ne]: null
      }
    },
    order: [['started', 'DESC']]
  });

  return seeding;
};

/**
 * Creates a new seeding entry to the DB. Finished property is left 
 * null.
 * @param started Optional date. Defaults to current date.
 */
const createNewSeeding = async (started: Date = new Date()): Promise<Seeding> => {
  const seeding = await Seeding.create({
    started: started
  });

  return seeding;
};

export default {
  getLatestSeeding,
  createNewSeeding
};