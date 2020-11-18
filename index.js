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
    case "CREATE_EMPLOYEE":
      return createEmployee();
    case "READ_EMPLOYEES":
      return readAllEmployees();
    case "READ_EMPLOYEES_BY_DEPARTMENT":
      return readAllEmployeesByDepartment();
    case "DELETE_EMPLOYEE":
      return deleteEmployee();
    case "CREATE_EMPLOYEE_ROLE":
      return createRole();
    case "READ_ALL_ROLES":
      return readAllRoles();
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

async function createEmployee() {
  const roles = await orm.readAllRoles();
  const employees = await orm.readAllEmployees();

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

  const roleChoices = roles.map(({ title, id }) => ({
    name: title, 
    value: id
  }));

  const { roleId } = await prompt({
    type: "list", 
    name: "roleId",
    message: "What is the roleId of the new employee?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ first_name, last_name, id }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list", 
    name: "managerId", 
    message: "Select the employee's manager.",
    choices: managerChoices
  });

  employee.manager_id = managerId;
  
  await orm.createEmployee(employee);

  console.log(`Added ${employee.first_name} ${employee.last_name} to the database!`);
  
  loadPrompts();
}

async function readAllEmployees() {
  const employees = await orm.readAllEmployees();

  console.log("\n");
  console.table(employees);

  loadPrompts();
}

async function readAllEmployeesByDepartment() {
  const departments = await orm.readAllDepartments();

  const departmentChoices = departments.map(({ name, id }) => ({
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

  const employees = await orm.readAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(employees);

  loadPrompts();
}

async function deleteEmployee() {
  const employees = await orm.readAllEmployees();

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

  await orm.deleteEmployee(employeeId);

  console.log("Removed employee from the database");

  loadPrompts();
}

async function createRole() {
  const departments = await orm.readAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name, 
    value: id
  }));

  const role = await prompt([
    {
      name: "title", 
      message: "Please enter the name of the role."
    },
    {
      name: "salary",
      message: "Please enter the salary for the role."
    }, 
    {
      type: "list", 
      name: "department_id", 
      message: "Select the department for the role.",
      choices: departmentChoices
    }
  ]);

  await orm.createRole(role);

  console.log(`Succesfully added ${role.title} to db`);

  loadPrompts();
}

async function readAllRoles() {
  const roles = await orm.readAllRoles();

  console.log("\n");
  console.table(roles);

  loadPrompts();
}


async function deleteRole() {
  const roles = await orm.readAllRoles();

  const roleChoices = roles.map(({ title, id }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to remove (this is will remove all associated employees)?",
      choices: roleChoices
    }
  ]);

  await orm.deleteRole(roleId);

  console.log("Removed role from the database");

  loadPrompts();
}

async function createDepartment() {
  const department = await prompt([
    {
      name: "name", 
      message: "What is the name of the new department?"
    }
  ]);

  await orm.createDepartment(department);
  
  console.log(`Added ${department.name} to the database`);

  loadPrompts();
}

async function readAllDepartments() {
  const departments = await orm.readAllDepartments();

  console.log("\n");
  console.table(departments);

  loadPrompts();
}


async function deleteDepartment() {
  const departments = await orm.readAllDepartments();

  const departmentChoices = departments.map(({ name }) => ({
    name: name,
  }));

  const { department } = await prompt([
    {
      type: "list",
      name: "department",
      message: "Which department do you want to remove (this is will remove all associated employees)?",
      choices: departmentChoices
    }
  ]);

  await orm.deleteDepartment(department);

  console.log("Removed department from the database");

  loadPrompts();
}

function quitProgram() {
  console.log("All Done!");
  process.exit();
}
