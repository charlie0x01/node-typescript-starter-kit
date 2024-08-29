import { cpus } from 'os';

import dotenv from 'dotenv';
dotenv.config();

const getNoOfWorkers = (workers: string | undefined, isNoOfCpus: string | undefined): number => {
  // NO_OF_CPUS_AS_WORKERS is true
  if (typeof isNoOfCpus === 'string' && isNoOfCpus === 'true') return cpus().length;
  //
  if (typeof workers === 'string') return parseInt(workers);
  // default
  return 1;
};

export default {
  APP_PORT: process.env.APP_PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  NUMBER_OF_WORKERS: getNoOfWorkers(process.env.NO_OF_WORKERS, process.env.NO_OF_CPUS_AS_WORKERS),
};
