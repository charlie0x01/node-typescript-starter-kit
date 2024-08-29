import cluster from 'cluster';

import env from './config/app.config';
import app from './app';
import logger from './utils/logger.utils';

if (cluster.isPrimary) {
  // generate swagger documentation
  (async function () {
    await import('./swagger/swagger');
  })();

  // TODO: style recommendation: set below statement background color green and foreground color black
  // TODO: add teminal bell when server starts
  logger.info(`Primary Process Starting ${env.NUMBER_OF_WORKERS} Workers!`);

  for (let worker = 1; worker <= env.NUMBER_OF_WORKERS; worker++) cluster.fork();

  // when a worker starts
  cluster.on('online', (workerInfo) => logger.info(`Worker with Process ${workerInfo.process.pid} Started!`));

  // start a new worker whenever a worker dies of some error
  cluster.on('exit', (worker, code, signal) => {
    logger.error('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    logger.info('Starting a new worker');
    cluster.fork();
  });
} else {
  // create express app
  const expressApp = app();
  // start listening to requests
  expressApp.listen(env.APP_PORT, () => {
    logger.info('=== SERVER STARTED ===');
    logger.info(`Server is up & running on http://localhost:${env.APP_PORT}`);
  });
}

// catch termination signals from system (system level interruptions)
process.on('SIGTERM', () => {
  logger.error('SIGTERM SIGNAL! Shutting down...');
  process.exit(1);
});

// catch termination signals from user (user level interruptions like Ctrl + C)
process.on('SIGINT', () => {
  logger.error('SIGINT SIGNAL! Shutting down...');
  process.exit(1);
});

// catch any error that is not catched properly
process.on('uncaughtException', (error) => {
  logger.error(`UNCAUGHT EXCEPTION! Shutting down... \n ${error}`);
  process.exit(1);
});
// catch any error that is not handled properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (error: any) => {
  logger.error(`UNHANDLED REJECTION! Shutting down... \n ${error}`);
  process.exit(1);
});
