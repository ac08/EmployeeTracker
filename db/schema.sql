### Schema

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE roles
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
	salary int,
	department_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL, 
	role_id int, 
	manager_id int,
	PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES roles(id),
	FOREIGN KEY (manager_id) REFERENCES employees(id)
);

