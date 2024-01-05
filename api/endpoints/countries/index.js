const axios = require("axios");
const phoneCodes = require("../../utils/phoneCodes");

module.exports = async () => {
  let countries = [];

  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  data.map((country) => {
    let item = {};

    item.name = country.name.common;
    item.nameNative = country.name.common;

    if (typeof country.name.nativeName == "object") {
      item.nameNative = Object.values(country.name.nativeName)[0].common;
    }

    item.cca2 = country.cca2;
    item.cca3 = country.cca3;
    item.region = country.region;
    item.subregion = country.subregion;

    item.capital = Array.isArray(country.capital) ? country.capital[0] : false;
    item.flag = country.flags.svg;

    item.languages = [];
    if (typeof country.languages == "object") {
      Object.entries(country.languages).map(([code, name]) => {
        item.languages.push({ code, name });
      });
    }

    item.lat = country.latlng[0];
    item.lng = country.latlng[1];

    item.currencies = [];
    if (typeof country.currencies == "object") {
      Object.entries(country.currencies).map(([code, value]) => {
        item.currencies.push({ code, name: value.name, symbol: value.symbol || "" });
      });
    }

    item.phoneMasks = [];

    if (phoneCodes[country.cca2]) {
      const code = phoneCodes[country.cca2];
      code.masks.map((mask) => {
        item.phoneMasks.push({ code: code.code, mask });
      });
    }

    countries.push(item);
  });

  return countries;
};
