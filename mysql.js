
const mysql = require("mysql2");
var pool = mysql.createPool({
  user: process.env.MYSQLUSER,
  password:process.env.MYSQLPASSWORD,
  database:process.env.MYSQLDATABASE,
  host:process.env.MYSQLHOST,
  port:process.env.MYSQLPORT
})

exports.pool = pool;