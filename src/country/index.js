const { default: axios } = require("axios");
const _ = require('lodash');
const { dataSave } = require("../utils");

module.exports = async ({ openapi }) => {
  const { data } = await axios.get('https://restcountries.com/v3.1/all');
  const countries = data.map(country => {
    return {
      name: country.name.common,
      cca2: country.cca2.toLowerCase(),
      cca3: country.cca3.toLowerCase(),
      languages: _.keys(country.languages),
      latlng: country.latlng,
      flags: country.flags.svg,
      postalCodeMask: (country.postalCode ? country.postalCode.format : false),
      phoneMask: false,
    };
  });

  openapi.tagAdd('country');

  openapi.pathAdd({
    operationId: 'country-index',
    path: '/country/index.json',
    method: 'get',
    tags: ['country'],
  });

  openapi.pathAdd({
    operationId: 'country-code',
    path: '/country/{code}.json',
    method: 'get',
    tags: ['country'],
    parameters: [
      { name: 'code', in: 'path', required: true, schema: { type: 'string' }},
    ],
  });

  dataSave('country/index.json', countries);
  
  countries.forEach(country => {
    dataSave(`country/${country.cca2}.json`, country);
  });
};
