const args = require('yargs').argv;
const getStdin = require('get-stdin');
const parseConfig = require('./lib/parse-config');
const formatJob = require('./lib/job-formatter');
const currentTime = args._[0];

getStdin().then(str => {
  const jobs = parseConfig(str);
  const formattedJobs = jobs.map(job => formatJob(job, currentTime));

  process.stdout.write(formattedJobs.join('\n') + '\n');
});

