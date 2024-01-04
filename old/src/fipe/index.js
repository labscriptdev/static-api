const axios = require('axios');
const { dataSave } = require('../utils');

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const getAsyncData = async (url, defaultReturn=[]) => {
  try {
    console.log(url);
    let { data } = await axios.get(url);
    return data;
  } catch(e) {
    console.error(e);
  }
  return defaultReturn;
};

module.exports = async ({ openapi }) => {
  return;
  
  const types = [
    { slug: 'motos', name: 'Motos' },
    { slug: 'carros', name: 'Carros' },
    { slug: 'caminhoes', name: 'Caminhões' },
  ];

  let brands = [];
  let models = [];
  let prices = [];

  await Promise.all(types.map(async (typeRaw) => {
    const type = {
      slug: typeRaw.slug,
      name: typeRaw.name,
    };

    const dataBrands = await getAsyncData(`https://parallelum.com.br/fipe/api/v1/${typeRaw.slug}/marcas`);

    await Promise.all(dataBrands.map(async (brandRaw) => {
      const brand = {
        slug: slugify(brandRaw.nome),
        name: brandRaw.nome,
      };

      let dataModels = await getAsyncData(`https://parallelum.com.br/fipe/api/v1/${typeRaw.slug}/marcas/${brandRaw.codigo}/modelos`, { anos: [], modelos: [] });
      await Promise.all(dataModels.modelos.map(async (modelRaw) => {
        const model = {
          slug: slugify(modelRaw.nome),
          name: modelRaw.nome,
          type,
          brand,
          years: [],
        };

        await Promise.all(dataModels.anos.map(async (yearRaw) => {
          const year = {
            name: yearRaw.nome,
            year: parseInt(yearRaw.nome.split(' ').at(0) || 0),
          };

          let priceRaw = await getAsyncData(`https://parallelum.com.br/fipe/api/v1/${typeRaw.slug}/marcas/${brandRaw.codigo}/modelos/${modelRaw.codigo}/anos/${yearRaw.codigo}`, {
            price: 0,
          });

          const price = {
            price: priceRaw.valor,
          };

          model.years.push(year);
          prices.push(price);
        }));

        // let dataYears = await getAsyncData(`https://parallelum.com.br/fipe/api/v1/${typeRaw.slug}/marcas/${brandRaw.codigo}/modelos/${modelRaw.codigo}/anos`);
        // await Promise.all(dataYears.map(async (yearRaw) => {
        //   const year = {
        //     name: yearRaw.nome,
        //     year: yearRaw.nome.split(' ').at(0),
        //   };
          
        //   model.years.push(year);
        // }));

        models.push(model);
        // brand.models.push(model);
      }));

      brands.push({ ...brand, type });
    }));
  }));

  dataSave('fipe/types.json', types);
  dataSave('fipe/brands.json', brands);
  dataSave('fipe/models.json', models);
  dataSave('fipe/prices.json', prices);
};
