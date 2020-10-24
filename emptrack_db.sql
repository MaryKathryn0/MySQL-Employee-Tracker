DROP DATABASE IF EXISTS emptrack_db;

CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE dept (
  id INT NOT NULL AUTO_INCREMENT,
  namedept VARCHAR(30) NOT NULL
);

INSERT INTO dept (deptname)
VALUES ("hr");

CREATE TABLE rol (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL
  salary DECIMAL(10) NOT NULL
  department_id INT NOT NULL
);

INSERT INTO rol (title,salary,department_id)
VALUES ("Director", "100000", "department_id");

CREATE TABLE empl (
  id INT NOT NULL AUTO_INCREMENT,
  fname VARCHAR(30) NOT NULL
  lname VARCHAR(30) NOT NULL
  role_id INT NOT NULL
  manager_id INT NOT NULL
);

INSERT INTO empl (fname,lname,role_id,manager_id)
VALUES ("Mary", "Jane", "role_id", "manager_id");

