const orm = require("./config/orm.js");


function init() {
  return inquirer.prompt([
    {
      type: "list",
      name: "selectCRUDoperation",
      message: "What would you like to do?",
      choices: ["Create", "Read", "Update"],
    } 
  ]).then(answer => {
    if (answer === "Read") {
      readOperation();
    }
    else if (answer === "Create") {
      createOperation();
    }
    else updateOperation();
});
}

// View departments, roles, employees

function createOperation() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'createOptions',
      message: 'What would you like to create?',
      choices: ['Department', 'Role', 'Employee'],
    } 
  ]).then(answer => {
    if (answer === 'Department') {
      orm.insert('first_name', 'employees')
    }
    });
}

function readOperation() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'readOptions',
      message: 'What would you like to read?',
      choices: ['Departments', 'Roles', 'Employees'],
    } 
  ]).then(answer => {
    if (answer === 'Departments') {
      orm.select('name', 'departments')
    } 
    else if (answer === 'Roles') {
      orm.select('title', 'roles')
    }
    else orm.select('first_name', 'employees')
  });
};
