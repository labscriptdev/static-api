const axios = require('axios');
const { dataSave } = require('../utils');

module.exports = async ({ openapi }) => {
  const codes = require('./codes');
  openapi.tagAdd('phone-code');

  openapi.pathAdd({
    path: `/phone-code/all.json`,
    method: 'get',
    tags: ['phone-code'],
  });

  dataSave('phone-code/all.json', codes);
};