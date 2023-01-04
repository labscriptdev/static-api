const dayjs = require('dayjs');
const { dataSave, openapiInit } = require('./utils');
const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');

(async () => {
  let app = {};
  app.openapi = openapiInit();
  
  let only = [
    // path.join(__dirname, 'country', 'index.js'),
  ];

  (await glob(`${__dirname}/**/index.js`)).map(async file => {
    if (file == path.join(__dirname, 'index.js')) return;
    if (only.length>0 && !only.includes(file)) return;
    console.log(`Running ${file}`);
    await require(file)(app);
  });

  dataSave('openapi.json', app.openapi);
})();
