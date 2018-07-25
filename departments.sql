DROP DATABASE IF EXISTS bDepartmentsDB;
CREATE DATABASE bDepartmentsDB;

USE bDepartmentsDB;

CREATE TABLE departments(
    department_id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    over_head_costs INT(10),
    PRIMARY KEY (id)
);