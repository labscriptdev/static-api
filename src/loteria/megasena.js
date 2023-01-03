const { dataSave } = require('../utils');
const { loteriaParse } = require('./utils');

module.exports = async () => {
  try {
    const { $ } = await loteriaParse('Mega-Sena');
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
    });

    dataSave('loteria-megasena.json', raffles);
  } catch(err) {
    console.log(err.message);
  }
};