const dayjs = require('dayjs');
const { dataSave } = require('./utils');

(async () => {
  await require('./loteria/index')();

  dataSave('index.json', {
    last_update: dayjs().format(),
  });
})();
