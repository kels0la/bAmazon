var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bAmazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startManager();
});

function startManager() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Please select what you would like to do:",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addToInventory();
                break;

            case "Add New Product":
                addNewProduct();
                break;
        }
    });
}
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //displays each item's pertinent statistics
        for (var i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].id + "\nProduct: " + res[i].productName + "\nDepartment: " + res[i].departmentName + "\nPrice: $" + res[i].price + "\nQuantity: " + res[i].stockQuantity)
        };
        console.log("");
        restartPrompt();
    })

}
function viewLowInventory() {
    connection.query("SELECT productName, stockQuantity FROM products WHERE stockQuantity < 5", function (err, res) {
        if (err) throw err;
        else {
            res.forEach(entry => console.log(`\n${entry.productName} has ${entry.stockQuantity} unit(s) remaining`));
            console.log('');
        }
        inquirer.prompt([
            {
                name: "replenish",
                type: "list",
                message: "Would you like to replenish inventory?",
                choices: ["Yes", "No"]
            }
        ]).then(function (answer) {
            if (answer.replenish === "Yes") {
                addToInventory();
            } else {
                connection.end();
            }
        })
    })
};
function addToInventory() {
    let currentQuantity;
    let newQuantity;
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        else {
            inquirer.prompt([
                {
                    name: "item",
                    type: "list",
                    message: "Which item would you like to replenish?",
                    choices: function () {
                        let choiceArray = [];
                        res.forEach(res => choiceArray.push(res.productName));
                        return choiceArray;
                    }
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many would you like to add?",
                    validate: validateNumber
                }
            ]).then(function (answer) {
                let product = answer.item;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].productName === product) {
                        currentQuantity = parseInt(res[i].stockQuantity);
                        newQuantity = (currentQuantity + parseInt(answer.amount));
                    }
                };

                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stockQuantity: newQuantity
                        },
                        {
                            productName: product
                        }
                    ], function (err, res) {
                        if (err) throw err;
                    }
                );
                console.log("");
                console.log(`${answer.amount} unit(s) have been added to the ${product} inventory. Total ${product} inventory is now ${newQuantity}.\n`)
                restartPrompt();
            })
        };
    });
};
function addNewProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "What is the name of the product you would like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "What department should this product be added to?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price per unit? (no dollar sign necessary)",
            validate: validateNumber
        },
        {
            name: "quantity",
            type: "input",
            message: "What is the inventory quantity for this product?",
            validate: validateNumber
        },
    ]).then(function(answer){
        console.log(answer);
        connection.query("INSERT INTO products SET?",
            {
                productName: answer.product_name,
                departmentName: answer.department,
                price: answer.price,
                stockQuantity: answer.quantity
            },
            function(err, res) {
                if (err) throw err;
            }
        )
        console.log("");
        console.log(`${answer.product_name} has been added to the ${answer.department} department at a price point of $${answer.price}, with ${answer.quantity} in stock\n`);
        restartPrompt();
    });
};
//Function to determine whether to restart the cycle or to close the connection
function restartPrompt() {
    inquirer.prompt([
        {
            name: "restart",
            type: "list",
            message: "Would you like to complete another action?",
            choices: ["Yes", "No"]
        }
    ]).then(function (answer) {
        if (answer.restart === "Yes") {
            startManager();
        } else {
            connection.end();
        }
    })
};
function validateNumber(value){
    if (isNaN(value) === true) {
        console.log("\nPlease enter a number");
        return false;
    }
    else if (parseInt(value) < 0) {
        console.log("\nPlease enter a non-negative value");
        return false;
    }
    return true;
};