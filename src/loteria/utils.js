const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const { dataSave } = require('../utils');

const moneyToNumber = (value) => {
  value = parseInt(value.replace(/[^0-9]/g, '')) / 100;
  return isNaN(value) ? 0 : value;
};

const loteriaSchema = async (params = {}) => {
  params = {
    name: 'Mega-Sena',
    number: 0,
    date: 1,
    accumulated: 0,
    numbersStart: 2,
    numbersFinal: 7,
    ...params
  };

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const { data } = await axios.get(`https://servicebus2.caixa.gov.br/portaldeloterias/api/resultados?modalidade=${params.name}`, { httpsAgent });
  const $ = cheerio.load(data.html);

  const getFieldValue = (eq, row) => {
    return $(`> td:eq(${eq})`, row).text();
  };

  let raffles = [];

  $('tbody > tr').each((index, row) => {
    const sortNumber = getFieldValue(params.number, row);
    if (!sortNumber || isNaN(sortNumber)) return;

    let raffle = {
      number: sortNumber,
      date: getFieldValue(params.date, row).split('/').reverse().join('-') +'T00:00:00',
      accumulated: 0,
      numbers: [],
      winners: [],
    };

    for(eqi=params.numbersStart; eqi<=params.numbersFinal; eqi++) {
      raffle.numbers.push( parseInt(getFieldValue(eqi, row)) );
    }

    params.winners.forEach(winner => {
      raffle.winners.push({
        name: winner.name,
        total: parseInt(getFieldValue(winner.total, row)),
        amount: moneyToNumber(getFieldValue(winner.amount, row)),
      });
    });

    raffles.push(raffle);
    dataSave(`loteria/${params.name.toLowerCase()}/${raffle.number}.json`, raffle);
  });

  dataSave(`loteria/${params.name.toLowerCase()}/all.json`, raffles);
};

module.exports = {
  moneyToNumber,
  loteriaSchema,
};