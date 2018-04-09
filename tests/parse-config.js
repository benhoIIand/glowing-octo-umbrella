const fs = require('fs');
const parseConfig = require('../src/parse-config');

const TEST_CONFIG = fs.readFileSync(`${__dirname}/test-config.txt`, 'utf8');

console.log('TEST_CONFIG', TEST_CONFIG);

/**

30 1 /bin/run_me_daily
45 * /bin/run_me_hourly
* * /bin/run_me_every_minute
* 19 /bin/run_me_sixty_times

*/


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
