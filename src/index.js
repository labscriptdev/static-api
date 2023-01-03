const dayjs = require('dayjs');
const { dataSave } = require('./utils');

(async () => {
  await require('./loteria/megasena')();
  await require('./loteria/lotofacil')();
  await require('./loteria/quina')();
  await require('./loteria/lotomania')();

  dataSave('index.json', {
    last_update: dayjs().format(),
  });
})();
