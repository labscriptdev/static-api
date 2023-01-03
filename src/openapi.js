const { dataSave } = require('./utils');

module.exports = async () => {
  let openapi = {
    openapi: '3.0.0',
    info: {
      title: 'Labscript.dev Static API',
      description: "Open Static API data",
      version: '1.0.0',
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0"
      },
      contact: {
        name: "Labscript.dev",
        email: "labscript.dev@gmail.com",
        url: "https://labscript.dev?ref=static-api"
      },
    },
    servers: [
      {
        url: 'https://raw.githubusercontent.com/labscriptdev/static-api/main/data/',
        description: 'Static API base url production',
      },
    ],
    tags: [
      {
        name: 'Loteria',
      },
    ],
    paths: {},
  };
  dataSave('openapi.json', openapi);
};