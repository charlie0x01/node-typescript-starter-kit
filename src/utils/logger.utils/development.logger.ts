import winston, { format } from 'winston';

const logMessageFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${label} ${level}: ${message}`; // LOG FORMAT
});

const developmentLogger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.label({ label: 'dev' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logMessageFormat
  ),
  transports: [new winston.transports.Console()], // only print log message in console
});

export default developmentLogger;
