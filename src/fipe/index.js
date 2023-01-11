const axios = require('axios');
const { dataSave } = require('../utils');

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const axiosData = async (url, def=[]) => {
  try {
    let { data } = await axios.get(url);
    return data;
  } catch(err) {
    return def;
  }
};

module.exports = async ({ openapi }) => {
  // const codes = require('./codes');
  openapi.tagAdd('fipe');

  let types = [
    {
      id: 'carros',
      name: 'Carros',
    },
    {
      id: 'motos',
      name: 'Motos',
    },
    {
      id: 'caminhoes',
      name: 'Caminhões',
    },
  ];

  dataSave(`/fipe/index.json`, types);

  for(let [typeIndex, type] of types.entries()) {

    let { data: brands } = await axiosData(`https://parallelum.com.br/fipe/api/v1/${type.id}/marcas`);
    brands = brands.map(brand => ({ id: slugify(brand.nome), ...brand }));

    for(let [brandIndex, brand] of brands.entries()) {
      let { data: models } = await axiosData(`https://parallelum.com.br/fipe/api/v1/${type.id}/marcas/${brand.codigo}/modelos`);
      models.modelos = models.modelos.map(item => ({ id: slugify(item.nome), ...item }));
      models.anos = models.anos.map(item => ({ id: slugify(item.nome), ...item }));

      dataSave(`/fipe/${type.id}/${brand.id}/index.json`, models.modelos.map(model => ({
        id: model.id,
        name: model.nome,
      })));

      for(let [modelIndex, model] of models.modelos.entries()) {
        let { data: years } = await axiosData(`https://parallelum.com.br/fipe/api/v1/${type.id}/marcas/${brand.codigo}/modelos/${model.codigo}/anos`);
        years = years.map(item => ({ id: slugify(item.nome), ...item }));

        dataSave(`/fipe/${type.id}/${brand.id}/${model.id}/index.json`, years.map(model => ({
          id: model.id,
          name: model.nome,
        })));

        for(let [yearIndex, year] of years.entries()) {
          let { data: value } = await axiosData(`https://parallelum.com.br/fipe/api/v1/${type.id}/marcas/${brand.codigo}/modelos/${model.codigo}/anos/${year.codigo}`);
          dataSave(`/fipe/${type.id}/${brand.id}/${model.id}/${year.id}/${year.codigo}.json`, {
            value: parseInt(value.Valor.replace(/[^0-9]/g, '')) / 100,
            fipe: value.CodigoFipe,
            fuel: value.SiglaCombustivel,
          });

          dataSave(`/fipe/${type.id}/${brand.id}/${model.id}/${year.id}/index.json`, years.map(model => ({
            id: model.id,
            name: model.nome,
          })));
        }
      }
    }
  }
};