var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err, res) {
  if (err) throw err;
  manageInventory();
});

function manageInventory() {
  inquirer
    .prompt({
      name: "manage",
      type: "list",
      message: "Manage Product Inventory [Press Q to quit]",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.manage) {
        case "View Products for Sale":
          showProducts();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;
      }
    });
}

function showProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    var myTable = [];

    for (var i = 0; i < res.length; i++) {
      var obj = {};
      obj["Item_id"] = res[i].item_id;
      obj["Product"] = res[i].product_name;
      obj["Department"] = res[i].department_name;
      obj["Price"] = res[i].price;
      obj["Stock"] = res[i].stock_quantity;
      myTable.push(obj);
    }
    console.table(myTable);
    manageInventory();
  });
};

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity <= 5";
    connection.query(query,function(err, res) {
        if (err) throw err;
        //console.log("res", res);
        var myTable = [];

    for (var i = 0; i < res.length; i++) {
      var obj = {};
      obj["Item_id"] = res[i].item_id;
      obj["Product"] = res[i].product_name;
      obj["Department"] = res[i].department_name;
      obj["Price"] = res[i].price;
      obj["Stock"] = res[i].stock_quantity;
      myTable.push(obj);
    }
    console.table(myTable);
        
    });
};

function addInventory() {
    inquirer
    .prompt([{
        name: "item_id",
        type: "number",
        message: "What Item ID would you like to update?"
        },
    {
        name: "stock",
        type: "number",
        message: "How many total item would you like to have?",
      }
    ])
    .then(function(answer) {
        var stock = answer.stock;
        var item = answer.item_id;
        var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

        connection.query(query, [stock, item], function(err, res){
            if (err) throw err;
            console.log("res", res);
                console.log("Updated the stock to " + stock); 
                showProducts();
        });

});
};

function addProduct() {
    var query = "INSERT INTO products (product_name, department_name, price, stock_quantity\) VALUES (" + product + "," + dept, price, stock)"
    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ()", function(err, res));
    console.log("something");
    
    };