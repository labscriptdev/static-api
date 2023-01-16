const path = require('path');
const fs = require('fs-extra');

const dataJson = (data) => {
  // return JSON.stringify(data);
  return JSON.stringify(data, 2, ' ');
};

const dataPath = (paths) => {
  if (typeof paths=='string') {
    paths = paths.split(/\/|\\/g).filter(value => !!value);
  }

  paths = [ __dirname, '..', 'data', ...paths ];
  return path.join.apply(null, paths);
};

const dataSave = (paths, data) => {
  let _dataPath = dataPath(paths);
  return fs.outputFileSync(_dataPath, dataJson(data));
};

const openapiInit = () => {
  return new class {
    constructor() {
      this.openapi = '3.0.0';
      this.info = {
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
      };
      this.servers = [{
        url: 'https://raw.githubusercontent.com/labscriptdev/static-api/main/data/',
        description: 'Static API base url production',
      }];
      this.tags = [];
      this.paths = {};
    }

    tagAdd(name) {
      this.tags.push({ name });
    }

    pathAdd(params) {
      if (!this.paths[ params.path ]) this.paths[ params.path ] = {};
      if (!this.paths[ params.path ][ params.method ]) this.paths[ params.path ][ params.method ] = {};

      let route = {};
      route.tags = params.tags || [];
      route.summary = params.summary || '';
      route.description = params.description || '';
      route.operationId = params.operationId || (params.method + params.path.split(/\/|\\|-/g).join('-'));
      route.parameters = params.parameters || [];
      route.responses = params.responses || {
        '200': { description: 'Success' },
        '404': { description: 'Not found' },
        '500': { description: 'Error' },
      };

      this.paths[ params.path ][ params.method ] = route;
    }
  };
  // return {
  //   openapi: '3.0.0',
  //   info: {
  //     title: 'Labscript.dev Static API',
  //     description: "Open Static API data",
  //     version: '1.0.0',
  //     license: {
  //       name: "Apache 2.0",
  //       url: "http://www.apache.org/licenses/LICENSE-2.0"
  //     },
  //     contact: {
  //       name: "Labscript.dev",
  //       email: "labscript.dev@gmail.com",
  //       url: "https://labscript.dev?ref=static-api"
  //     },
  //   },
  //   servers: [
  //     {
  //       url: 'https://raw.githubusercontent.com/labscriptdev/static-api/main/data/',
  //       description: 'Static API base url production',
  //     },
  //   ],
  //   tags: [],
  //   paths: {},
  // };
};

module.exports = {
  dataJson,
  dataPath,
  dataSave,
  openapiInit,
};