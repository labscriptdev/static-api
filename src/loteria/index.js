const { loteriaSchema } = require('./utils');

module.exports = async () => {
  loteriaSchema({
    name: 'Mega-Sena',
    number: 0,
    date: 1,
    numbersStart: 2,
    numbersFinal: 7,
    winners: [
      { name: 'Sena', total: 8, amount: 11 },
      { name: 'Quina', total: 9, amount: 12 },
      { name: 'Quadra', total: 10, amount: 13 },
    ],
  });

  loteriaSchema({
    name: 'Lotofacil',
    number: 0,
    date: 1,
    numbersStart: 2,
    numbersFinal: 16,
    winners: [
      { name: 'Ganhadores 15 números', total: 18, amount: 24 },
      { name: 'Ganhadores 14 números', total: 21, amount: 25 },
      { name: 'Ganhadores 13 números', total: 21, amount: 26 },
      { name: 'Ganhadores 12 números', total: 22, amount: 27 },
      { name: 'Ganhadores 11 números', total: 23, amount: 28 },
    ],
  });
  
  loteriaSchema({
    name: 'Quina',
    number: 0,
    date: 1,
    numbersStart: 2,
    numbersFinal: 6,
    winners: [
      { name: 'Ganhadores Quina', total: 8, amount: 10 },
      { name: 'Ganhadores Quadra', total: 11, amount: 12 },
      { name: 'Ganhadores Terno', total: 13, amount: 14 },
    ],
  });
  
  loteriaSchema({
    name: 'Lotomania',
    number: 0,
    date: 1,
    numbersStart: 2,
    numbersFinal: 21,
    winners: [
      { name: 'Ganhadores 20 números', total: 23, amount: 31 },
      { name: 'Ganhadores 19 números', total: 26, amount: 32 },
      { name: 'Ganhadores 18 números', total: 27, amount: 33 },
      { name: 'Ganhadores 17 números', total: 28, amount: 34 },
      { name: 'Ganhadores 16 números', total: 29, amount: 35 },
      { name: 'Ganhadores nenhum número', total: 30, amount: 36 },
    ],
  });
  
  loteriaSchema({
    name: 'Dupla-Sena',
    number: 0,
    date: 1,
    numbersStart: 2,
    numbersFinal: 7,
    winners: [
      { name: 'Ganhadores Sena', total: 9, amount: 11 },
      { name: 'Ganhadores Quina', total: 14, amount: 15 },
      { name: 'Ganhadores Quadra', total: 16, amount: 17 },
      { name: 'Ganhadores Terno', total: 18, amount: 19 },
    ],
  });
};