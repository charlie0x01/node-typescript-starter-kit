import dotenv from 'dotenv';
dotenv.config();

export default {
  APP_PORT: process.env.APP_PORT || 8000,
};
