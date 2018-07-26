DROP DATABASE IF EXISTS bAmazonDB;
CREATE DATABASE bAmazonDB;

USE bAmazonDB;

CREATE TABLE products(
  id INT AUTO_INCREMENT NOT NULL,
  productName VARCHAR(30),
  departmentName VARCHAR(30),
  price DECIMAL(10, 2),
  stockQuantity INT(5),
  product_sales DECIMAL(20, 2),
  PRIMARY KEY (id)
);

CREATE TABLE departments(
    department_id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    over_head_costs INT(10),
    PRIMARY KEY (department_id)
);
-- 1
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("iPhone", "Electronics", 800, 7, 0);
-- 2
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("SamTV","Electronics", 400, 3, 0);
-- 3
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Killer Pants", "Apparel", 30, 21, 0);
-- 4
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Chicken Wings", "Food", 7, 56, 0);
-- 5
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Voice Recorder", "Electronics", 50, 10, 0);
-- 6
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Snazzy T-Shirt", "Apparel", 15, 65, 0);
-- 7
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Pasta Noodles", "Food", 4, 105, 0);
-- 8
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Chicken Breasts", "Food", 8, 12, 0);
-- 9
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Power Cord", "Electronics", 12, 1, 0);
-- 10
INSERT INTO products (productName, departmentName, price, stockQuantity, product_sales)
VALUES ("Sweatshirt", "Apparel", 45, 2, 0);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES ("Electronics", 2000, 4050),
  ("Food", 1000, 200),
  ("Apparel", 500, 90),
  ("Necessities", 300, 1000),
  ("Films", 350, 750),
  ("Water", 500, 900),
  ("Produce", 700, 450);