const parseTimeValue = x => x === '*' ? '*' : parseInt(x);

module.exports = config => {
  const jobs = config.split('\n');

  return jobs
    .filter(job => job !== '')    // removes any extra lines at the bottom of the file
    .map(job => {
      const parts = job.split(' ');

      return {
        minute: parseTimeValue(parts[0]),
        hour: parseTimeValue(parts[1]),
        cmd: parts[2],
      };
    });
};
