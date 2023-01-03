const { loteriaParse, moneyToNumber } = require('./utils');

module.exports = async () => {
  try {
    loteriaParse('Lotofacil', ({ $, raffle, index, row }) => {

      raffle.accumulated = moneyToNumber($('> td:eq(29)', row).text());

      for(let eqi=2; eqi<=16; eqi++) {
        raffle.numbers.push( parseInt($(`> td:eq(${eqi})`, row).text()) );
      }

      let winners = [
        { name: 'Ganhadores 15 números', totalEq: 18, amountEq: 24 },
        { name: 'Ganhadores 14 números', totalEq: 21, amountEq: 25 },
        { name: 'Ganhadores 13 números', totalEq: 21, amountEq: 26 },
        { name: 'Ganhadores 12 números', totalEq: 22, amountEq: 27 },
        { name: 'Ganhadores 11 números', totalEq: 23, amountEq: 28 },
      ];

      winners.forEach(winner => {
        raffle.winners.push({
          name: winner.name,
          total: parseInt($(`> td:eq(${winner.totalEq})`, row).text()),
          amount: moneyToNumber($(`> td:eq(${winner.amountEq})`, row).text()),
        });
      });

      return raffle;
    });
  } catch(err) {
    console.log(err.message);
  }
};