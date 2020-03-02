var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'USERNAME',
  password        : 'PASSWORD',
  database        : 'DATABASE'
});
module.exports.pool = pool;
