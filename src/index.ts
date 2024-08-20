import app from './app';
import { boldText } from './utils/console-colors';
import env from './config/env';

app.listen(env.APP_PORT, () => {
  console.log(boldText.GREEN, `Server is up & running on http://localhost:${env.APP_PORT}`);
});

// catch termination signals from system (system level interruptions)
process.on('SIGTERM', (signal) => {
  console.error(boldText.RED, 'SIGTERM SIGNAL! Shutting down...');
  console.error(signal);
  process.exit(1);
});

// catch termination signals from user (user level interruptions like Ctrl + C)
process.on('SIGINT', (signal) => {
  console.error(boldText.RED, 'SIGINT SIGNAL! Shutting down...');
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
