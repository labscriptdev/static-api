const path = require('path');
const fs = require('fs-extra');
const axios = require('axios');

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
  

const capitalize = (str, lower = false) => {
  return  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
};

const arrayToObject = (arr, attr='id') => {
  return Object.fromEntries(arr.map(item => ([ item[attr ], item])));
}

class Fipe {
  static async request(params = {}) {
    params = {
      path: '',
      params: {},
      default: [],
      callback: false,
      ...params
    };

    params.url = `https://parallelum.com.br/fipe/api/v2/${params.url}`;
    console.log(params.url);
  
    try {
      let { data } = await axios.get(params.url, {
        params: params.params,
      });
      if (typeof params.callback=='function') {
        data = params.callback(data);
      }
      return data;
    } catch(err) {
      return params.default;
    }
  }

  static filename() {
    const filename = path.join(__dirname, 'all.js');
    if (!fs.existsSync(filename) || true) {
      this.save({
        cars: {
          id: 'cars',
          name: 'Carros',
          brands: {},
        },
        motorcycles: {
          id: 'motorcycles',
          name: 'Motos',
          brands: {},
        },
        trucks: {
          id: 'trucks',
          name: 'Caminhões',
          brands: {},
        },
      });
    }
    return filename;
  }

  static async all() {
    return require(this.filename());
  }

  static save(data) {
    data = JSON.stringify(data, ' ', 2);
    return fs.outputFileSync(this.filename(), `module.exports = ${data};`);
  }
}

(async () => {
  let types = await Fipe.all();

  for(let type of Object.values(types)) {
    type.brands = await Fipe.request({
      url: `/${type.id}/brands`,
      callback(data) {
        return arrayToObject(data.map(item => {
          return {
            id: slugify(item.name),
            ...item,
            models: {},
          };
        }));
      },
    });
    Fipe.save(types);
    break;

    for(let brand of Object.values(type.brands)) {
      brand.models = await Fipe.request({
        url: `/${type.id}/brands/${brand.code}/models`,
        callback(data) {
          return arrayToObject(data.map(brand => ({
            id: slugify(brand.name),
            ...brand,
            years: {},
          })));
        },
      });

      for(let model of Object.values(brand.models)) {
        model.years = await Fipe.request({
          url: `/${type.id}/brands/${brand.code}/models/${model.code}/years`,
          callback(data) {
            return arrayToObject(data.map(brand => ({
              id: slugify(brand.name),
              ...brand,
              fipe: {},
            })));
          },
        });

        for(let year of Object.values(model.years)) {
          year.fipe = await Fipe.request({
            url: `/${type.id}/brands/${brand.code}/models/${model.code}/years/${year.code}`,
            default: {},
            callback(data) {
              return {
                ...data,
                price: ( parseInt(data.price.replace(/[^0-9]/g, '')) / 100 ),
              };
            },
          });
        }
      }
    }
  }
})();