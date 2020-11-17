const { prompt } = require("inquirer");
const orm = require("./config/orm");
require("console.table");

loadPrompts();

async function loadPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "Read All Employees",
          value: "READ_EMPLOYEES"
        },
        {
          name: "Read All Employees By Department",
          value: "READ_EMPLOYEES_BY_DEPARTMENT"
        },
        {
          name: "Create Employee",
          value: "CREATE_EMPLOYEE"
        },
        {
          name: "Delete Employee",
          value: "DELETE_EMPLOYEE"
        },
        {
          name: "Create Employee Role",
          value: "CREATE_EMPLOYEE_ROLE"
        },
        {
          name: "Read All Employee Roles",
          value: "READ_ALL_ROLES"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Delete Employee Role",
          value: "DELETE_EMPLOYEE_ROLE"
        },
        {
          name: "Create Department",
          value: "CREATE_DEPARTMENTS"
        },
        {
          name: "Read All Departments",
          value: "READ_ALL_DEPARTMENTS"
        },
        {
          name: "Delete Department",
          value: "DELETE_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);

  // Call the function depending on user choice 
  switch (choice) {
    case "READ_EMPLOYEES":
      return readAllEmployees();
    case "READ_EMPLOYEES_BY_DEPARTMENT":
      return readAllEmployeesByDepartment();
    case "CREATE_EMPLOYEE":
      return createEmployee();
    case "DELETE_EMPLOYEE":
      return deleteEmployee();
    case "CREATE_EMPLOYEE_ROLE":
      return createRole();
    case "READ_ALL_ROLES":
      return readAllRoles();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole(); 
    case "DELETE_EMPLOYEE_ROLE":
      return deleteRole();
    case "CREATE_DEPARTMENTS":
      return createDepartment();
    case "READ_ALL_DEPARTMENTS":
      return readAllDepartments();
    case "DELETE_DEPARTMENT":
      return deleteDepartment();      
    default:
      return quitProgram();
  }
}

async function readAllEmployees() {
  const employees = await orm.readAllEmployees();

  console.log("\n");
  console.table(employees);

  loadPrompts();
}

async function readAllEmployeesByDepartment() {
  const departments = await orm.readAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);

  const employees = await orm.findAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(employees);

  loadPrompts();
}

async function removeEmployee() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log("Removed employee from the database");

  loadPrompts();
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);
}


function quitProgram() {
  console.log("All Done!");
  process.exit();
}
