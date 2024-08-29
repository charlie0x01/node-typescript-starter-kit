import winston from 'winston';

import appConfig from '../../config/app.config';

import developmentLogger from './development.logger';
import productionLogger from './production.logger';

let logger: winston.Logger;

if (appConfig.NODE_ENV === 'production') logger = productionLogger;
else logger = developmentLogger;

export default logger;
