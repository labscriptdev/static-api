const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');

const loteriaParse = async (modality) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const { data } = await axios.get(`https://servicebus2.caixa.gov.br/portaldeloterias/api/resultados?modalidade=${modality}`, { httpsAgent });
  const $ = cheerio.load(data.html);
  return { $ };
};

const moneyToNumber = (value) => {
  value = parseInt(value.replace(/[^0-9]/g, '')) / 100;
  return isNaN(value) ? 0 : value;
};

module.exports = {
  loteriaParse,
  moneyToNumber,
};