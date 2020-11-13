### Schema

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL, 
	role_id int, 
	manager_id int,
	PRIMARY KEY (id),
	-- FOREIGN KEY (role_id) REFERENCES role(id),
	-- FOREIGN KEY (manager_id) REFERENCES department(id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
	salary int,
	department_id int NOT NULL,
	PRIMARY KEY (id),
	-- FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
);
