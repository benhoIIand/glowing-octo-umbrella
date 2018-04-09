const args = require('yargs').argv;
const getStdin = require('get-stdin');
const parseConfig = require('./parse-config');

getStdin().then(str => {
  const config = parseConfig(str);

  console.log('config', config);
});

