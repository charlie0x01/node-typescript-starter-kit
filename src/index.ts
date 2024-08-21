import os from 'os';
import cluster from 'cluster';

import app from './app';
import consoleLogColors from './utils/console-colors';
import env from './config/env';

if (cluster.isPrimary) {
  const numOfWorkers = os.cpus().length / 2;
  // TODO: style recommendation: set below statement background color green and foreground color black
  // TODO: add teminal bell when server starts
  console.log(`Primary Process Starting ${numOfWorkers} Workers!`);

  // generate swagger documentation
  (async function () {
    await import('./swagger/swagger');
  })();

  for (let worker = 1; worker <= numOfWorkers; worker++) cluster.fork();

  // when a worker starts
  cluster.on('online', (workerInfo) =>
    console.log(consoleLogColors.reguralText.GREEN, ` Worker with Process ${workerInfo.process.pid} Started!`)
  );

  // start a new worker whenever a worker dies of some error
  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  app.listen(env.APP_PORT, () => {
    console.log(consoleLogColors.boldText.GREEN, `Server is up & running on http://localhost:${env.APP_PORT}`);
  });
}

// catch termination signals from system (system level interruptions)
process.on('SIGTERM', (signal) => {
  console.error(consoleLogColors.boldText.RED, 'SIGTERM SIGNAL! Shutting down...');
  console.error(signal);
  process.exit(1);
});

// catch termination signals from user (user level interruptions like Ctrl + C)
process.on('SIGINT', (signal) => {
  console.error(consoleLogColors.boldText.RED, 'SIGINT SIGNAL! Shutting down...');
  console.error(signal);
  process.exit(1);
});

// catch any error that is not catched properly
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
// catch any error that is not handled properly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (err: any) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
