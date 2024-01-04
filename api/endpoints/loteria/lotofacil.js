const Loteria = require("../../utils/loteria");

module.exports = async (scrapData = true) => {
  const loteria = new Loteria({
    id: "lotofacil",
    name: "Lotofacil",
    rangeStart: 1,
    rangeFinal: 25,
    rangePerRow: 5,
  });

  if (scrapData) {
    await loteria.scrapData((row) => {
      return {
        number: row["A"],
        date: row["B"].split("/").reverse().join("-"),
        numbers: [
          row["C"],
          row["D"],
          row["E"],
          row["F"],
          row["G"],
          row["H"],
          row["I"],
          row["J"],
          row["K"],
          row["L"],
          row["M"],
          row["N"],
          row["O"],
          row["P"],
          row["Q"],
        ],
      };
    });
  }

  return loteria;
};
