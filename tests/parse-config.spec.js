const fs = require('fs');
const parseConfig = require('../lib/parse-config');

const TEST_CONFIG = fs.readFileSync(`${__dirname}/test-config.txt`, 'utf8');

describe('When parsing the cron job configuration', () => {

  it('should return an array of objects representing each cron job', () => {
    expect(parseConfig(TEST_CONFIG)).toEqual([
      { minute: 30, hour: 1, cmd: '/bin/run_me_daily' },
      { minute: 45, hour: '*', cmd: '/bin/run_me_hourly' },
      { minute: '*', hour: '*', cmd: '/bin/run_me_every_minute' },
      { minute: '*', hour: 19, cmd: '/bin/run_me_sixty_times' },
    ]);
  });
});
