const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;

// const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// //const dbSocketAddr = process.env.DB_HOST.split(':');
//  const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';


// var connection = mysql.createPool({
//   user: process.env.DB_USER, //dbConfig.USER,
//   password: process.env.DB_PASS, //dbConfig.PASSWORD,
//   database: process.env.DB_NAME, //dbConfig.DB
//     socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`
//   //port: dbSocketAddr[1]
// });

// module.exports = connection;
