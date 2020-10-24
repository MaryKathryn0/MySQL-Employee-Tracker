DROP DATABASE IF EXISTS emptrack_db;

CREATE DATABASE emptrack_db;

USE emptrack_db;

CREATE TABLE bevs(
  id INT NOT NULL AUTO_INCREMENT,
  color VARCHAR(100) NOT NULL,
  brand VARCHAR(100) NOT NULL
);

INSERT INTO bevs (color,brand)
VALUES ("red", "Duckhorn");

INSERT INTO bevs (color,brand)
VALUES ("white", "KimCrawford");

INSERT INTO bevs (color,brand)
VALUES ("bubbly", "Chandon");

