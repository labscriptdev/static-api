const { dataSave } = require('../utils');
const { loteriaParse, moneyToNumber } = require('./utils');

module.exports = async () => {
  try {
    const { $ } = await loteriaParse('Lotofacil');
    let raffles = [];

    $('tbody > tr').each((index, item) => {    
      const sortNumber = parseInt($('> td:eq(0)', item).text());
      if (!sortNumber || isNaN(sortNumber)) return;
  
      let raffle = {
        number: sortNumber,
        date: $('> td:eq(1)', item).text().split('/').reverse().join('-') +'T00:00:00',
        accumulated: moneyToNumber($('> td:eq(29)', item).text()),
        numbers: [
          parseInt($('> td:eq(2)', item).text()),
          parseInt($('> td:eq(3)', item).text()),
          parseInt($('> td:eq(4)', item).text()),
          parseInt($('> td:eq(5)', item).text()),
          parseInt($('> td:eq(6)', item).text()),
          parseInt($('> td:eq(7)', item).text()),
          parseInt($('> td:eq(8)', item).text()),
          parseInt($('> td:eq(9)', item).text()),
          parseInt($('> td:eq(10)', item).text()),
          parseInt($('> td:eq(11)', item).text()),
          parseInt($('> td:eq(12)', item).text()),
          parseInt($('> td:eq(13)', item).text()),
          parseInt($('> td:eq(14)', item).text()),
          parseInt($('> td:eq(15)', item).text()),
          parseInt($('> td:eq(16)', item).text()),
        ],
        winners: [
          {
            name: 'Ganhadores 15 números',
            total: parseInt($('> td:eq(18)', item).text()),
            amount: moneyToNumber($('> td:eq(24)', item).text()),
          },
          {
            name: 'Ganhadores 14 números',
            total: parseInt($('> td:eq(20)', item).text()),
            amount: moneyToNumber($('> td:eq(25)', item).text()),
          },
          {
            name: 'Ganhadores 13 números',
            total: parseInt($('> td:eq(21)', item).text()),
            amount: moneyToNumber($('> td:eq(26)', item).text()),
          },
          {
            name: 'Ganhadores 12 números',
            total: parseInt($('> td:eq(22)', item).text()),
            amount: moneyToNumber($('> td:eq(27)', item).text()),
          },
          {
            name: 'Ganhadores 11 números',
            total: parseInt($('> td:eq(23)', item).text()),
            amount: moneyToNumber($('> td:eq(28)', item).text()),
          },
        ],
      };
  
      raffles.push(raffle);
    });

    dataSave('loteria-lotofacil.json', raffles);
  } catch(err) {
    console.log(err.message);
  }
};