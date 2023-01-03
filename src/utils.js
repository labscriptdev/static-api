const path = require('path');
const fs = require('fs-extra');

const dataJson = (data) => {
  return JSON.stringify(data);
  // return JSON.stringify(data, 2, ' ');
};

const dataPath = (paths) => {
  if (typeof paths=='string') {
    paths = paths.split(/\/|\\/g).filter(value => !!value);
  }

  paths = [ __dirname, '..', 'data', ...paths ];
  return path.join.apply(null, paths);
};

const dataSave = (paths, data) => {
  let _dataPath = dataPath(paths);
  return fs.outputFileSync(_dataPath, dataJson(data));
};

module.exports = {
  dataJson,
  dataPath,
  dataSave,
};