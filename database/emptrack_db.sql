DROP DATABASE IF EXISTS emptrack_db;

CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  namedept VARCHAR(30) NOT NULL
);

INSERT INTO department (namedept)
VALUES ("hr");

CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL 
);

INSERT INTO role (title,salary,department_id)
VALUES ("Director", "100000", "1234");

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Mary", "Jane", "1000", "1111");

