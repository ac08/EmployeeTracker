const { prompt } = require('inquirer');
const orm = require("./config/orm.js");
require('console.table');


function init() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'selectCRUDoperation',
      message: 'What would you like to do?',
      choices: ['Create', 'Read', 'Update'],
    } 
  ]).then(answer => {
    if (answer === 'Create') {
      createOperation();
    }
    else if (answer === 'Read') {
      readOperation();
    }
    else updateOperation();
});
}
