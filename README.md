# Employee Database Management

The Employee Database Management is a Content Management System (CMS). The application applies ORM techniques and Node.js CLI to create an interface for non-developers to interact with a database(mySQL). The solution is meant to manage a company's employees using node, inquirer, MySQL.

## Installation

To install and use the application please clone GitHub Repo to local machine. Then open Command Line Interface and type 'npm i' to install package dependencies. Following install, please type 'npm start' into the terminal to begin working with the database. Follow the inquirer prompts to guide work.
## Behind the Scenes - Database Schema Image

![Database Schema](assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

## Access to the Application

You are required to submit the following:

* The URL of the GitHub repository:
https://github.com/ac08/EmployeeTracker

### Demo of the Application

* https://drive.google.com/file/d/1N0avM1tgy7Wv2LVsphz8X5cGSb1GxblF/view

