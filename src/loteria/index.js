const { dataSave } = require('../utils');
const { loteriaSchema } = require('./utils');

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
        rangeStart: 1,
        rangeFinal: 60,
        rangePerRow: 10,
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
        rangeStart: 1,
        rangeFinal: 25,
        rangePerRow: 5,
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
        rangeStart: 1,
        rangeFinal: 80,
        rangePerRow: 10,
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
        rangeStart: 1,
        rangeFinal: 100,
        rangePerRow: 10,
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
        rangeStart: 1,
        rangeFinal: 50,
        rangePerRow: 10,
      },
    },
  ];

  dataSave('loteria/index.json', loterias.map(loteria => {
    return {
      id: loteria.schema.id,
      name: loteria.schema.name,
      rangeStart: loteria.schema.rangeStart,
      rangeFinal: loteria.schema.rangeFinal,
      rangePerRow: loteria.schema.rangePerRow,
    };
  }));

  openapi.tagAdd('loteria');

  openapi.pathAdd({
    operationId: `loteria-index`,
    path: '/loteria/index.json',
    method: 'get',
    tags: ['loteria'],
  });
  
  loterias.forEach(loteria => {
    loteriaSchema(loteria.schema);

    openapi.pathAdd({
      operationId: `loteria-${loteria.schema.id}-index`,
      path: `/loteria/${loteria.schema.id}/index.json`,
      method: 'get',
      tags: ['loteria'],
    });
    
    openapi.pathAdd({
      operationId: `loteria-${loteria.schema.id}-number`,
      path: `/loteria/${loteria.schema.id}/{number}.json`,
      method: 'get',
      tags: ['loteria'],
      parameters: [
        { name: 'number', in: 'path', required: true, schema: { type: 'string' }},
      ],
    });
    
    openapi.pathAdd({
      operationId: `loteria-${loteria.schema.id}-all`,
      path: `/loteria/${loteria.schema.id}/all.json`,
      method: 'get',
      tags: ['loteria'],
    });
  });
};