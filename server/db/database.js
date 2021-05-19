const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'boodle',
  password: 'password',
  port: 5432
});

// a generic query, that executes all queries you send to it
function query(text) {
    return new Promise((resolve, reject) => {
      pool
        .query(text)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  module.exports = {
    query
  };