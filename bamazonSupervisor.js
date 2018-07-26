const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
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
    startSupervisor();
});
function startSupervisor() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Please select what you would like to do:",
        choices: [
            "View Product Sales by Department",
            "Create New Department"
        ]
    }).then(function (answer) {
        if (answer.action === "View Product Sales by Department") {
            viewProductSales();
        } else {
            createDepartment();
        };
    });
};

function viewProductSales(){
    connection.query("SELECT department_id AS id, department_name AS Department, SUM(over_head_costs) AS Overhead, SUM(products.product_sales) AS Sales, SUM((products.product_sales - over_head_costs)) AS Profit FROM departments INNER JOIN products ON department_name = products.departmentName GROUP BY department_id ORDER BY department_id;", function (err, res){
        if (err) throw err;
        console.log("")
        console.table(res)
        restartPrompt()
    })
};

function createDepartment(){
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the department you would like to add?"
        },
        {
            name: "overhead",
            type: "input",
            message: "What are the overhead costs of the department?",
            validate: validateNumber
        }
    ]).then(function(answer){
        connection.query("INSERT INTO departments SET?",
        {
            department_name: answer.department,
            over_head_costs: answer.overhead
        },
        function(err, res) {
            if (err) throw err;
        }
    );
    console.log(`\nThe ${answer.department} department with overhead costs of ${answer.overhead} has been added to the database.\n`);
    restartPrompt();
    });
};

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
            startSupervisor();
        } else {
            connection.end();
        };
    });
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