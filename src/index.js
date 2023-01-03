const dayjs = require('dayjs');
const { dataSave } = require('./utils');

(async () => {
  await require('./loteria/index')();
  await require('./openapi')();
})();
