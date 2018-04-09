const jobFormatter = require('../src/job-formatter');


/**

30 1 /bin/run_me_daily
45 * /bin/run_me_hourly
* * /bin/run_me_every_minute
* 19 /bin/run_me_sixty_times

1:30 tomorrow - /bin/run_me_daily
16:45 today - /bin/run_me_hourly
16:10 today - /bin/run_me_every_minute
19:00 today - /bin/run_me_sixty_times


 */


describe('When formatting a job', () => {

    it('should return the next time it will run', () => {
      const scenarios = [
        {
          job: { minute: 30, hour: 1, cmd: '/bin/cmd' },
          currentTime: '16:10',
          expected: '1:30 tomorrow - /bin/cmd',
        },
        {
          job: { minute: 45, hour: '*', cmd: '/bin/cmd' },
          currentTime: '16:10',
          expected: '16:45 today - /bin/cmd',
        },
        {
          job: { minute: '*', hour: '*', cmd: '/bin/cmd' },
          currentTime: '16:10',
          expected: '16:10 today - /bin/cmd',
        },
        {
          job: { minute: '*', hour: 19, cmd: '/bin/cmd' },
          currentTime: '16:10',
          expected: '19:00 today - /bin/cmd',
        },
        {
          job: { minute: 0, hour: '*', cmd: '/bin/cmd' },
          currentTime: '16:10',
          expected: '15:00 today - /bin/cmd',
        },
        {
          job: { minute: 30, hour: '*', cmd: '/bin/cmd' },
          currentTime: '00:00',
          expected: '00:30 today - /bin/cmd',
        },
      ];

      scenarios.forEach(({ job, currentTime, expected }) => {
        const res = jobFormatter(job, currentTime);

        expect(res).toEqual(expected);
      });
    });
});
