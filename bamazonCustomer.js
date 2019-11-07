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
  showProducts();
});

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
    buyNow();
  });
}

function validateQ(input) {
    if (isNaN(input) === false) {
        return true;
    } else if (isNaN(input) === true) {
        console.log('\nYou need to provide a number');
        return false;
    }
}

function buyNow() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "number",
        message: "What Item ID would you like to buy? [Press  to quit]",
        validate: validateQ
      },
      {
        name: "quantity",
        type: "number",
        message: "How many would you like to buy?",
        validate: validateQ
      }
    ])
    .then(function(answer) {
      var query =
        "SELECT item_id,stock_quantity,price FROM products WHERE item_id = ?";
      var item = answer.item_id;
      var quantity = answer.quantity;

      connection.query(query, item, function(err, res) {
        var price = res[0].price;
        if (quantity <= res[0].stock_quantity) {
          var total = quantity * price;
          connection.query(
            "UPDATE products SET stock_quantity = stock_quantity - " +
              quantity +
              " WHERE item_id = " +
              item
          );
          console.log("\n-------------------------------------------------");
          console.log("\nSuccess!  Your total purchase today is $" + total);
          console.log("\n-------------------------------------------------");

          showProducts();
        } else {
          console.log("\n-------------------------------------------------");
          console.log("\nInsufficient quantity! Try buying something else.");
          console.log("\n-------------------------------------------------");
          showProducts();
        }
      });
    });
}
