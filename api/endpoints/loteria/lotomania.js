const Loteria = require("../../utils/loteria");

module.exports = async (scrapData = true) => {
  const loteria = new Loteria({
    id: "lotomania",
    name: "Lotomania",
    rangeStart: 1,
    rangeFinal: 100,
    rangePerRow: 10,
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
          row["R"],
          row["S"],
          row["T"],
          row["U"],
          row["V"],
        ],
      };
    });
  }

  return loteria;
};
