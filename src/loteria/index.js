const axios = require('axios');
const https = require('https');
const XLSX = require('xlsx');

const { dataSave } = require('../utils');

const getLottoResults = async (params = {}) => {
  params = {
    id: 'mega-sena',
    name: 'Mega-Sena',
    rangeStart: 1,
    rangeFinal: 60,
    rangePerRow: 10,
    parseRow: (rows) => rows,
    ...params
  };

  const resp = await axios(`https://servicebus2.caixa.gov.br/portaldeloterias/api/resultados/download?modalidade=${params.name}`, {
    responseType: 'arraybuffer',
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });

  const workbook = XLSX.read(resp.data);
  const workSheet = workbook.Sheets[workbook.SheetNames[0]];

  let data = [];
  for(let i in workSheet) {
    const [ col, row ] = i.split(/([A-Z]*)([0-9]*)/g).filter(v => v);
    if (typeof data[row] == 'undefined') data[row] = {};
    data[row][col] = workSheet[i]['v'];
  }

  data = data.filter(v => v);
  data.splice(0, 1);
  return data;
};

module.exports = async ({ openapi }) => {
  let loterias = [
    {
      id: 'super-sete',
      name: 'Super Sete',
      rangeStart: 1,
      rangeFinal: 60,
      rangePerRow: 10,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
            row['I'],
          ],
        };
      },
    },
    {
      id: 'dia-de-sorte',
      name: 'Dia de Sorte',
      rangeStart: 1,
      rangeFinal: 60,
      rangePerRow: 10,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
            row['I'],
          ],
        };
      },
    },
    {
      id: 'dupla-sena',
      name: 'Dupla Sena',
      rangeStart: 1,
      rangeFinal: 60,
      rangePerRow: 10,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
            row['I'],
          ],
        };
      },
    },
    {
      id: 'lotomania',
      name: 'Lotomania',
      rangeStart: 1,
      rangeFinal: 100,
      rangePerRow: 10,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
            row['I'],
            row['J'],
            row['K'],
            row['L'],
            row['M'],
            row['N'],
            row['O'],
            row['P'],
            row['Q'],
            row['R'],
            row['S'],
            row['T'],
            row['U'],
            row['V'],
          ],
        };
      },
    },
    {
      id: 'lotofacil',
      name: 'Lotofacil',
      rangeStart: 1,
      rangeFinal: 25,
      rangePerRow: 5,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
            row['I'],
            row['J'],
            row['K'],
            row['L'],
            row['M'],
            row['N'],
            row['O'],
            row['P'],
            row['Q'],
          ],
        };
      },
    },
    {
      id: 'milionaria',
      name: 'Milionária',
      rangeStart: 1,
      rangeFinal: 25,
      rangePerRow: 5,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
            row['I'],
            row['J'],
          ],
        };
      },
    },
    {
      id: 'quina',
      name: 'Quina',
      rangeStart: 1,
      rangeFinal: 80,
      rangePerRow: 10,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
          ],
        };
      },
    },
    {
      id: 'mega-sena',
      name: 'Mega-Sena',
      rangeStart: 1,
      rangeFinal: 60,
      rangePerRow: 10,
      parseRow: (row) => {
        return {
          number: row['A'],
          date: row['B'].split('/').reverse().join('-'),
          numbers: [
            row['C'],
            row['D'],
            row['E'],
            row['F'],
            row['G'],
            row['H'],
          ],
        };
      },
    },
  ];

  dataSave('loteria/index.json', loterias);

  loterias.map(async loteria => {
    const results = await getLottoResults(loteria);
    let save = JSON.parse(JSON.stringify(loteria));
    save.data = results.map(loteria.parseRow);
    dataSave(`loteria/${loteria.id}.json`, save);
  });
};