const { dataSave, openapiInit } = require('./utils');
const path = require('path');
const glob = require('fast-glob');

(async () => {
  const openapi = openapiInit();
  console.clear();
  
  let only = [
    path.join(__dirname, 'loteria', 'index.js'),
  ];

  for(const file of await glob(`${__dirname}/**/index.js`)) {
    if (file == path.join(__dirname, 'index.js')) continue;
    if (only.length>0 && !only.includes(file)) continue;
    console.log(`Running ${file}`);
    const a = require(file);
    await require(file)({ openapi });
  }

  // console.log(openapi);
  // dataSave('openapi.json', openapi);
})();
