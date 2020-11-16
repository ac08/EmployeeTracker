const connection = require("./connection.js");

const orm = {
  select: function(whatToSelect, tableInput) {
    const sql = 'SELECT ?? FROM ??;';
    connection.query(sql, [whatToSelect, tableInput], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  insertEmployee: function(tableInput, [values]) {
    const sql = 'INSERT INTO ?? (first_name, last_name, role_id, manager_id) VALUES ([values]);';
    connection.query(sql, [tableInput, [values]], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
};

module.exports = orm;

