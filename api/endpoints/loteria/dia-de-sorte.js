const Loteria = require("../../utils/loteria");

module.exports = async (scrapData = true) => {
  const loteria = new Loteria({
    id: "dia-de-sorte",
    name: "Dia de Sorte",
    rangeStart: 1,
    rangeFinal: 60,
    rangePerRow: 10,
  });

  if (scrapData) {
    await loteria.scrapData((row) => {
      return {
        number: row["A"],
        date: row["B"].split("/").reverse().join("-"),
        numbers: [row["C"], row["D"], row["E"], row["F"], row["G"], row["H"], row["I"]],
      };
    });
  }

  return loteria;
};
