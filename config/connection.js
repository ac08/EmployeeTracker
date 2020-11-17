const util = require('util')
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cleveland08!",
  database: "employees"
});

connection.connect();
// Setting up connection.query to use promises and not callbacks
// Enables use of async await syntax
connection.query = util.promisify(connection.query);


module.exports = connection;
