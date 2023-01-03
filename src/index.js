// const core = require('@actions/core');
// const github = require('@actions/github');

const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');

(async () => {
  await require('./loteria/megasena')();
})();


// (async () => {
//   const dataPath = path.join(__dirname, '..', 'data', 'index.json');
//   const dataJson = JSON.stringify({
//     last_update: dayjs().format(),
//   }, ' ', 1);
  
//   try {
//     fs.writeFileSync(dataPath, dataJson);
//   } catch(err) {
//     console.log(err);
//   }
  
//   console.log(`${dataPath} generated: `, dataJson);
// })();
