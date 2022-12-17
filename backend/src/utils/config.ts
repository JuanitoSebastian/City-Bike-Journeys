import dotenv from 'dotenv';
dotenv.config();

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  POSTGRES_URI: string | undefined;
  POSTGRES_DB: string | undefined;
  POSTGRES_USER: string | undefined;
  POSTGERS_PW: string | undefined;
  POSTGRES_TEST_URI: string | undefined;
  POSTGRES_TEST_DB: string | undefined;
  POSTGRES_TEST_USER: string | undefined;
  POSTGERS_TEST_PW: string | undefined;
}
interface Config {
  NODE_ENV: string;
  PORT: number;
  POSTGRES_URI: string;
  POSTGRES_DB: string;
  POSTGRES_USER: string;
  POSTGERS_PW: string;
  POSTGRES_TEST_URI: string;
  POSTGRES_TEST_DB: string;
  POSTGRES_TEST_USER: string;
  POSTGERS_TEST_PW: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    POSTGRES_URI: process.env.POSTGRES_URI,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGERS_PW: process.env.POSTGRES_PW,
    POSTGRES_TEST_URI: process.env.POSTGRES_TEST_URI,
    POSTGRES_TEST_DB: process.env.POSTGRES_TEST_DB,
    POSTGRES_TEST_USER: process.env.POSTGRES_TEST_USER,
    POSTGERS_TEST_PW: process.env.POSTGRES_TEST_PW
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;