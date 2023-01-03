const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

module.exports = async () => {
  
  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await axios.get('https://servicebus2.caixa.gov.br/portaldeloterias/api/resultados?modalidade=Mega-Sena', { httpsAgent });
    const $ = cheerio.load(data.html);
    let raffles = [];

    $('tbody > tr').each((index, item) => {    
      const sortNumber = parseInt($('td:eq(0)', item).text());
      if (!sortNumber || isNaN(sortNumber)) return;
  
      const moneyToNumber = (value) => {
        return parseInt(value.replace(/[^0-9]/g, '')) / 100;
      };
  
      let raffle = {
        number: sortNumber,
        date: $('td:eq(1)', item).text().split('/').reverse().join('-') +'T00:00:00',
        accumulated: moneyToNumber($('td:eq(17)', item).text()),
        numbers: [
          parseInt($('td:eq(2)', item).text()),
          parseInt($('td:eq(3)', item).text()),
          parseInt($('td:eq(4)', item).text()),
          parseInt($('td:eq(5)', item).text()),
          parseInt($('td:eq(6)', item).text()),
          parseInt($('td:eq(7)', item).text()),
        ],
        winners: [
          {
            name: 'Sena',
            total: parseInt($('td:eq(8)', item).text()),
            amount: moneyToNumber($('td:eq(11)', item).text()),
          },
          {
            name: 'Quina',
            total: parseInt($('td:eq(9)', item).text()),
            amount: moneyToNumber($('td:eq(12)', item).text()),
          },
          {
            name: 'Quadra',
            total: parseInt($('td:eq(10)', item).text()),
            amount: moneyToNumber($('td:eq(13)', item).text()),
          },
        ],
      };
  
      raffles.push(raffle);
  
      const dataPath = path.join(__dirname, '../..', 'data', 'loteria-megasena.json');
      const dataJson = JSON.stringify(raffles, ' ', 2);
      fs.writeFileSync(dataPath, dataJson);
    });
  } catch(err) {
    console.log(err.message);
  }
};