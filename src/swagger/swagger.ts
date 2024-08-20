import swaggerAutogen from 'swagger-autogen';

import { boldText } from '../utils/consoleColors';

const documentConfiguration = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'NodeJS Typescript Boilerplate', // by default: 'REST API'
    description: 'A Starter Kit for NodeJS REST APIs', // by default: ''
  },
  servers: [
    {
      url: 'http://localhost:8000', // by default: 'http://localhost:3000'
      description: '', // by default: ''
    },
    // { ... }
  ],
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '', // Tag description
    },
    // { ... }
  ],
  components: {}, // by default: empty object
};

export const outputFile = './src/swagger/swaggerDocumentation.json';
export const routes = ['../app.ts'];
swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, documentConfiguration)
  .then(async () => {
    // run server when swagger done with documention
    return await import('../index');
  })
  .catch((error) => console.log(boldText.RED, error));
