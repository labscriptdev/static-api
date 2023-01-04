const axios = require('axios');
const _ = require('lodash');

module.exports = async ({ openapi }) => {
  openapi.tagAdd('phone-code');
};