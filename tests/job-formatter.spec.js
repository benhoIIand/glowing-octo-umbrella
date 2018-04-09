const jobFormatter = require('../lib/job-formatter');

describe('When formatting a job', () => {

    const scenarios = [
      {
        job: { minute: 30, hour: 1, cmd: '/bin/cmd' },
        currentTime: '16:10',
        expected: '1:30 tomorrow - /bin/cmd',
      },
      {
        job: { minute: '*', hour: 2, cmd: '/bin/cmd' },
        currentTime: '16:10',
        expected: '2:00 tomorrow - /bin/cmd',
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
        expected: '17:00 today - /bin/cmd',
      },
      {
        job: { minute: 30, hour: '*', cmd: '/bin/cmd' },
        currentTime: '00:00',
        expected: '0:30 today - /bin/cmd',
      },
      {
        job: { minute: '*', hour: '*', cmd: '/bin/cmd' },
        currentTime: '16:10',
        expected: '16:10 today - /bin/cmd',
      },
    ];

    scenarios.forEach(({ job, currentTime, expected }) => {
      it('should return the next time it will run', () => {
        const res = jobFormatter(job, currentTime);

        expect(res).toEqual(expected);
      });
    });
});
