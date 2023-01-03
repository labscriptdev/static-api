const { loteriaParse, moneyToNumber } = require('./utils');

module.exports = async () => {
  try {
    loteriaParse('Lotomania', ({ $, raffle, index, row }) => {

      raffle.accumulated = moneyToNumber($('> td:eq(29)', row).text());

      for(let eqi=2; eqi<=21; eqi++) {
        raffle.numbers.push( parseInt($(`> td:eq(${eqi})`, row).text()) );
      }

      let winners = [
        { name: 'Ganhadores 20 números', totalEq: 23, amountEq: 31 },
        { name: 'Ganhadores 19 números', totalEq: 26, amountEq: 32 },
        { name: 'Ganhadores 18 números', totalEq: 27, amountEq: 33 },
        { name: 'Ganhadores 17 números', totalEq: 28, amountEq: 34 },
        { name: 'Ganhadores 16 números', totalEq: 29, amountEq: 35 },
        { name: 'Ganhadores nenhum número', totalEq: 30, amountEq: 36 },
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