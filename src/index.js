const dayjs = require('dayjs');
const { dataSave } = require('./utils');

(async () => {
  // await require('./loteria/megasena')();

  dataSave('index.json', {
    last_update: dayjs().format(),
  });
})();
