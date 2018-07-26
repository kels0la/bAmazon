//Enabling mysql and inquirer
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bAmazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    startCustomer();
});


function startCustomer() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //displays each item's pertinent statistics
       console.log("------------------------\nItems Available for Sale\n------------------------");
       for (var i = 0; i < res.length; i++) {
           console.log(res[i].id +
               " | " + res[i].productName +
               " | Price: $" + res[i].price +
               " | Quantity: " + res[i].stockQuantity);
       };
       console.log("---------------------------------------------------------");
        //prompt to select the item for purchase
        inquirer.prompt([
            {
                name: "itemID",
                type: "list",
                choices: function () {
                    var choiceArray = [];
                    for (var n = 0; n < res.length; n++) {
                        choiceArray.push(res[n].id.toString() + " " + res[n].productName);
                    }
                    return choiceArray;
                },
                message: "Which item would you like to purchase?"
            }
        ]).then(function (answer) {

            let splitItemID = answer.itemID.split(" ", 1);
            let chosenItemID = parseInt(splitItemID - 1);
            
            inquirer.prompt([
                {
                    name: "numberPurchased",
                    type: "input",
                    message: "How many items would you like to buy?",
                    //Determining if the input is valid
                    validate: function (value) {
                        if (parseInt(value) < 0) {
                            console.log("\nPlease enter a non-negative value")
                            return false;
                        }
                        if ((isNaN(value) === false) && (res[chosenItemID].stockQuantity >= parseInt(value))) {
                            return true;
                        }
                        console.log("\nQuantity specified not in supply. Please specify a different amount.")
                        return false;
                    }
                }
            ]).then(function (ans) {
                //Updates MySQL database
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stockQuantity: (res[chosenItemID].stockQuantity - ans.numberPurchased),
                            product_sales: parseFloat(res[chosenItemID].product_sales + ((res[chosenItemID]).price * ans.numberPurchased))
                        },
                        {
                            id: chosenItemID + 1,
                            id: chosenItemID + 1
                        }
                    ], function (err, res) {
                        if (err) throw err;
                    }

                );
                console.log("\nCongratulations. You have purchased " + ans.numberPurchased + " " +
                    res[chosenItemID].productName + "(s) @ $" + res[chosenItemID].price + " for a grand total of: $" +
                    (res[chosenItemID].price * ans.numberPurchased) + "!\n");

                restartPrompt();
            });

        });
    });
};
//Function to determine whether to restart the cycle or to close the connection
function restartPrompt() {
    inquirer.prompt([
        {
            name: "restart",
            type: "list",
            message: "Would you like to make another purchase?",
            choices: ["Yes", "No"]
        }
    ]).then(function (answer) {
        if (answer.restart === "Yes") {
            startCustomer();
        } else {
            connection.end();
        }
    });
};