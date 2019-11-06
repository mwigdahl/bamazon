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
        obj['Item_id'] = res[i].item_id;
        obj['Product'] = res[i].product_name;
        obj['Department'] = res[i].department_name;
        obj['Price'] = res[i].price;
        obj['Stock'] = res[i].stock_quantity;

        myTable.push(obj);
    }
    console.table(myTable);
    buyNow();
  });

}

function buyNow() {
  inquirer
    .prompt({
      name: "item_id",
      type: "text",
      message: "What Item ID would you like to buy?"
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.item_id === "1") {
        console.log("You picked: " + answer.item_id);
        //pickItem();
        connection.end();
      } else {
        console.log("good bye");

        connection.end();
      }
    });
}
