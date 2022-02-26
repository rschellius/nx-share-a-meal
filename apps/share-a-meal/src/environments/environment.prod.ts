const packagejson = require('../../package.json');

export const environment = {
  production: true,

  // SERVER_API_URL: 'https://node-programmeren-4.herokuapp.com/api/',
  SERVER_API_URL: 'https://nestjs-mongoose-cswf.herokuapp.com/api/',

  version: packagejson.version,
};
