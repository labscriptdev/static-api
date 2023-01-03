const { loteriaParse, moneyToNumber } = require('./utils');

module.exports = async () => {
  try {
    loteriaParse('Mega-Sena', ({ $, raffle, index, row }) => {

      raffle.accumulated = moneyToNumber($('> td:eq(17)', row).text());

      for(eqi=2; eqi<=7; eqi++) {
        raffle.numbers.push( parseInt($(`> td:eq(${eqi})`, row).text()) );
      }

      let winners = [
        { name: 'Sena', totalEq: 8, amountEq: 11 },
        { name: 'Quina', totalEq: 9, amountEq: 12 },
        { name: 'Quadra', totalEq: 10, amountEq: 13 },
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