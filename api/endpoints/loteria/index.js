module.exports = async () => {
  let loterias = [];

  loterias.push(await require("./dia-de-sorte.js")(false));
  loterias.push(await require("./dupla-sena.js")(false));
  loterias.push(await require("./lotofacil.js")(false));
  loterias.push(await require("./lotomania.js")(false));
  loterias.push(await require("./mega-sena.js")(false));
  loterias.push(await require("./milionaria.js")(false));
  loterias.push(await require("./quina.js")(false));
  loterias.push(await require("./super-sete.js")(false));

  return loterias;
};
