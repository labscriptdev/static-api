const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const { dataSave } = require('../utils');

const loteriaParse = async (modality, callback) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const { data } = await axios.get(`https://servicebus2.caixa.gov.br/portaldeloterias/api/resultados?modalidade=${modality}`, { httpsAgent });
  const $ = cheerio.load(data.html);
  
  let raffles = [];

  $('tbody > tr').each((index, row) => {
    const sortNumber = parseInt($('> td:eq(0)', row).text());
    if (!sortNumber || isNaN(sortNumber)) return;

    let raffle = {
      number: sortNumber,
      date: $('> td:eq(1)', row).text().split('/').reverse().join('-') +'T00:00:00',
      accumulated: 0,
      numbers: [],
      winners: [],
    };

    raffle = callback({ $, raffle, index, row });
    raffles.push(raffle);
  });
  
  dataSave(`loteria-${modality.toLowerCase()}.json`, raffles);
};

const moneyToNumber = (value) => {
  value = parseInt(value.replace(/[^0-9]/g, '')) / 100;
  return isNaN(value) ? 0 : value;
};

module.exports = {
  loteriaParse,
  moneyToNumber,
};