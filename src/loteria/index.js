const { loteriaSchema } = require('./utils');
const { dataSave } = require('../utils');

module.exports = async ({ openapi }) => {
  let loterias = [
    {
      schema: {
        id: 'mega-sena',
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
      },
    },
    {
      schema: {
        id: 'lotofacil',
        name: 'Lotofacil',
        number: 0,
        date: 1,
        numbersStart: 2,
        numbersFinal: 16,
        winners: [
          { name: '15 números', total: 18, amount: 24 },
          { name: '14 números', total: 21, amount: 25 },
          { name: '13 números', total: 21, amount: 26 },
          { name: '12 números', total: 22, amount: 27 },
          { name: '11 números', total: 23, amount: 28 },
        ],
      },
    },
    {
      schema: {
        id: 'quina',
        name: 'Quina',
        number: 0,
        date: 1,
        numbersStart: 2,
        numbersFinal: 6,
        winners: [
          { name: 'Quina', total: 8, amount: 10 },
          { name: 'Quadra', total: 11, amount: 12 },
          { name: 'Terno', total: 13, amount: 14 },
        ],
      },
    },
    {
      schema: {
        id: 'lotomania',
        name: 'Lotomania',
        number: 0,
        date: 1,
        numbersStart: 2,
        numbersFinal: 21,
        winners: [
          { name: '20 números', total: 23, amount: 31 },
          { name: '19 números', total: 26, amount: 32 },
          { name: '18 números', total: 27, amount: 33 },
          { name: '17 números', total: 28, amount: 34 },
          { name: '16 números', total: 29, amount: 35 },
          { name: 'nenhum número', total: 30, amount: 36 },
        ],
      },
    },
    {
      schema: {
        id: 'dupla-sena',
        name: 'Dupla-Sena',
        number: 0,
        date: 1,
        numbersStart: 2,
        numbersFinal: 7,
        winners: [
          { name: 'Sena', total: 9, amount: 11 },
          { name: 'Quina', total: 14, amount: 15 },
          { name: 'Quadra', total: 16, amount: 17 },
          { name: 'Terno', total: 18, amount: 19 },
        ],
      },
    },
  ];

  openapi.tagAdd('loteria');

  openapi.pathAdd({
    path: '/loteria/index.json',
    method: 'get',
    tags: ['loteria'],
  });
  
  loterias.forEach(loteria => {
    loteriaSchema(loteria.schema);

    openapi.pathAdd({
      path: `/loteria/${loteria.schema.id}/all.json`,
      method: 'get',
      tags: ['loteria'],
    });
  });
};