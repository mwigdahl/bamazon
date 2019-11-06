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
      var stock = res[i].stock_quantity;
    }
    console.table(myTable);
    buyNow();
  });
}

function buyNow() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "number",
        message: "What Item ID would you like to buy? [Press Q to quit]",
        validate: function(value) {
          // if (value === "q" || value === "Q") {
          //     connection.end();
          // }
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "number",
        message: "How many would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query =
        "SELECT item_id,stock_quantity FROM products WHERE item_id = ?";
      var item = answer.item_id;
      var quantity = answer.quantity;
      console.log(item + " " + quantity);

      connection.query(query, item, function(err, res) {
        // console.log('res', res[0].stock_quantity);
        if (quantity <= res[0].stock_quantity) {
          console.log("you can purchase this!");
          connection.query(
            "UPDATE products SET stock_quantity = stock_quantity - " +
              quantity +
              " WHERE item_id = " +
              item
          );
          showProducts();
        } else {
          console.log("Insufficient quantity!");
          connection.end();
        }
      });
    });
}
