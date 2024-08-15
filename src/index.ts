import app from './app';
import { boldText } from './utils/consoleColors';
import env from './utils/env';

app.listen(env.APP_PORT, () => {
  console.log(boldText.GREEN, `Server is up & running on http://localhost:${env.APP_PORT}`);
});

// catch termination signals from system (system level interruptions)
process.on('SIGTERM', (signal) => {
  console.log(boldText.RED, 'SIGTERM signal: ', signal);
});

// catch termination signals from user (user level interruptions like Ctrl + C)
process.on('SIGINT', (signal) => {
  console.log(boldText.RED, 'SIGINT signal: ', signal);
});

// catch any error that is not catched properly
process.on('uncaughtException', (error) => {
  console.log(boldText.RED, 'Uncaught Error: ', error?.message);
  process.exit(1);
});

// catch any error that is not handled properly
process.on('unhandledRejection', (error) => {
  console.log(boldText.RED, 'Unhandled Error: ', error);
});
