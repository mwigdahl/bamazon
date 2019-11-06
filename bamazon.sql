DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(5) NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
)

SELECT * FROM bamazon_db.products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES 
        ("Guitar","Music",250,10), 
        ("Drums","Music",400,8),
        ("Keyboard","Music",350,12),
        ("Coffee Maker","Kitchen",75,100),
        ("Blender","Kitchen",25,5),
        ("Microphone","Music",50,32),
        ("Chair","Furniture",125,23),
        ("Sofa","Furniture",1000,3),
        ("Rocking Chair","Furniture",200,5),
        ("Clavinet","Music",1500,2);