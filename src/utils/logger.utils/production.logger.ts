import winston, { format } from 'winston';

const logMessageFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${label} ${level}: ${message}`; // LOG FORMAT
});

const productionLogger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.label({ label: 'production' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logMessageFormat
  ),
  transports: [
    new winston.transports.File({ filename: `${__dirname.split('src')[0]}logs\\error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${__dirname.split('src')[0]}logs\\combined.log` }),
  ], // only print log message in console
});

export default productionLogger;
