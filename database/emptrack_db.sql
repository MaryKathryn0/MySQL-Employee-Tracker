DROP DATABASE IF EXISTS emptrack_db;

CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

INSERT INTO department (name)
VALUES ("HR"),("IT"),("Sales");


CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) 
);

INSERT INTO role (title,salary,department_id)
VALUES ("Director of HR", 100000, 1), ("Trainer", 75000, 1), ("Director of IT", 100000, 2), ("Admin", 50000, 2),
("Director of Sales", 100000, 3), ("Sales Rep", 50000, 3);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INTEGER NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Mary", "Jane", 1, NULL), ("John", "Doe", 3, NULL), ("Bilbo", "Baggins", 4, 2), ("Snoop", "Dog", 2, 1), ("Lois", "Lane", 5, NULL), ("Casper", "Ghost", 6, 5);
