const args = require('yargs').argv;
const getStdin = require('get-stdin');

getStdin().then(str => {
  console.log(str);
});

