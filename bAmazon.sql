DROP DATABASE IF EXISTS bAmazonDB;
CREATE DATABASE bAmazonDB;

USE bAmazonDB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  productName VARCHAR(30),
  departmentName VARCHAR(30),
  price DECIMAL(10, 2),
  stockQuantity INT(5),
  PRIMARY KEY (id)
);
-- 1
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("iPhone", "Electronics", 800, 7);
-- 2
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("SamTV","Electronics", 400, 3);
-- 3
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Killer Pants", "Apparel", 30, 21);
-- 4
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Chicken Wings", "Food", 7, 56);
-- 5
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Voice Recorder", "Electronics", 50, 10);
-- 6
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Snazzy T-Shirt", "Apparel", 15, 65);
-- 7
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Pasta Noodles", "Food", 4, 105);
-- 8
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Chicken Breasts", "Food", 8, 12);
-- 9
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Power Cord", "Electronics", 12, 1);
-- 10
INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Sweatshirt", "Apparel", 45, 2);