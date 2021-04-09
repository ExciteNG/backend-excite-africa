// const pg = require('pg');
//
// const conString = 'postgres://cewdcwdw:C5M_kl...@queenie.db.elephantsql.com:5432/cewdcwdw';
//
// const client = new pg.Client(conString);
//
// client.connect((err) => {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', (err, result) => {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log('connected to database');
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//     return true;
//   });
// });
