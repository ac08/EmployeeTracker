const connection = require("./connection.js");

const orm = {
  select: function(whatToSelect, tableInput) {
    const sql = "SELECT ?? FROM ??";
    connection.query(sql, [whatToSelect, tableInput], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
};

module.exports = orm;
