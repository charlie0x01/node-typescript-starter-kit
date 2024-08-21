import swaggerAutogen from 'swagger-autogen';

import { boldText } from '../utils/console-colors';

const documentConfiguration = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'NodeJS Typescript Starter Kit', // by default: 'REST API'
    description: 'A Starter Kit for NodeJS REST APIs', // by default: ''
  },
  servers: [
    {
      url: 'http://localhost:8000/api/v1', // by default: 'http://localhost:3000'
      description: '', // by default: ''
    },
  ],
  tags: [
    {
      name: 'Welcome', // Tag name
      description: 'Default API Endpoints', // Tag description
    },
    {
      name: 'Test Error Handling', // Tag name
      description: 'Test Error Handling API Endpoints', // Tag description
    },
  ],
};

export const outputFile = './src/swagger/swagger-documentation.json';
export const routes = ['./routes/index'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, documentConfiguration).catch((error) =>
  console.log(boldText.RED, error)
);
