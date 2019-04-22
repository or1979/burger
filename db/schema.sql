CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name VARCHAR(200) NULL,
	dvoured BOOLEAN DEFAULT 0,
	PRIMARY KEY (id)
);
