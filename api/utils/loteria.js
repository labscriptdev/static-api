const axios = require("axios");
const https = require("https");
const XLSX = require("xlsx");

module.exports = class {
  constructor({ id, name, rangeStart, rangeFinal, rangePerRow }) {
    this.id = id;
    this.name = name;
    this.rangeStart = rangeStart;
    this.rangeFinal = rangeFinal;
    this.rangePerRow = rangePerRow;
  }

  async scrapData(parseRow = null) {
    const resp = await axios(
      `https://servicebus2.caixa.gov.br/portaldeloterias/api/resultados/download?modalidade=${this.name}`,
      {
        responseType: "arraybuffer",
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    const workbook = XLSX.read(resp.data);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];

    let data = [];
    for (let i in workSheet) {
      const [col, row] = i.split(/([A-Z]*)([0-9]*)/g).filter((v) => v);
      if (typeof data[row] == "undefined") data[row] = {};
      data[row][col] = workSheet[i]["v"];
    }
    data = data.filter((v) => v);
    data.splice(0, 1);

    if (parseRow === null) {
      parseRow = (row) => {
        return {
          number: row["A"],
          date: row["B"].split("/").reverse().join("-"),
          numbers: [row["C"], row["D"], row["E"], row["F"], row["G"], row["H"]],
        };
      };
    }

    this.data = data.map(parseRow);
    return data;
  }
};
