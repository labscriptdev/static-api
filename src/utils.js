const path = require('path');

const jsonToString = (data) => {
  return JSON.stringify(data, 2, ' ');
};

module.exports = {
  jsonToString,
};