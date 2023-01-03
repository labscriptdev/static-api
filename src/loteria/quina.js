const { loteriaParse, moneyToNumber } = require('./utils');

module.exports = async () => {
  try {
    loteriaParse('Quina', ({ $, raffle, index, row }) => {

      raffle.accumulated = moneyToNumber($('> td:eq(29)', row).text());

      for(let eqi=2; eqi<=6; eqi++) {
        raffle.numbers.push( parseInt($(`> td:eq(${eqi})`, row).text()) );
      }

      let winners = [
        { name: 'Ganhadores Quina', totalEq: 8, amountEq: 10 },
        { name: 'Ganhadores Quadra', totalEq: 11, amountEq: 12 },
        { name: 'Ganhadores Terno', totalEq: 13, amountEq: 14 },
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