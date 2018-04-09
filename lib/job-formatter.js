const isNumber = i => !isNaN(i);

const parseCurrentTime = time => {
  const parts = time.split(':');

  return {
    hour: parseInt(parts[0]),
    minute: parseInt(parts[1]),
  };
};

const padNumber = i => (`0${i}`).slice(-2);

module.exports = (job, currentTime) => {
  const targetTime = parseCurrentTime(currentTime);
  const isHourWild = !isNumber(job.hour);
  const isMinuteWild = !isNumber(job.minute);

  const runMinute = isMinuteWild ? 0 : job.minute;
  let runHour = isHourWild ? targetTime.hour : job.hour;

  // If it's set to run every minute of every hour
  if (isHourWild && isMinuteWild) {
    return `${targetTime.hour}:${padNumber(targetTime.minute)} today - ${job.cmd}`;
  }

  // Add an hour on to the run time if it's currently in the past
  if (isHourWild && runMinute < targetTime.minute) {
    runHour++;
  }

  // If the run hour is less than the target time then it'll run tomorrow
  if (runHour < targetTime.hour) {
    return `${runHour}:${padNumber(runMinute)} tomorrow - ${job.cmd}`;
  }

  const hour = runMinute > targetTime.minute ? targetTime.hour : runHour;

  // Run today
  return `${runHour}:${padNumber(runMinute)} today - ${job.cmd}`;
};
