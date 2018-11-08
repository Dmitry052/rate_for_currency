const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, './../public/js');
const script = `Raven.config('${process.env.DSN}').install();`;

fs.writeFile(`${folderPath}/ravenRun.js`, script, err => {
  if (err) {
    return console.info(err);
  }
  return console.info('The Raven config was saved!');
});
