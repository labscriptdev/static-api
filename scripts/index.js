const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');

const data = {
  last_update: dayjs().format(),
};


try {
  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'index.json'),
    JSON.stringify(data, ' ', 2)
  );
} catch(err) {
  console.log(err);
}