var mysql = require("mysql");
//var db = require("./database")
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "meowsers",
    database: "emptrack_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user

});

function start() {


    inquirer.prompt([
        {
            type: "list",
            message: "Choose from the following actions:",
            name: "action",
            choices: [
                "Add departments",
                "Add roles",
                "Add employees",
                "View employees by department",
                "View employees by role",
                "View all employees",
                "Update employee role",
                "Exit"
            ]
        },
    ])
        .then(function (response) {

            switch (response.action) {
                case "Add departments":
                    addDept();
                    break;

                case "Add roles":
                    addRole();
                    break;

                case "Add employees":
                    addEmpl();
                    break;

                case "View departments":
                    viewDept();
                    break;

                case "View roles":
                    viewRole();
                    break;

                case "View employees":
                    viewEmpl();
                    break;

                case "Update employee role":
                    updateRole();
                    break;

                case "Exit":
                    exit();
                    break;
            }
        });
}

function addDept() {
    inquirer.prompt({
        type: "input",
        message: "Input department name"
    })
        .then(function (response) {
            console.log(response);
        })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Input role title:",
            name: "title"
        },
        {
            type: "input",
            message: "Input salary:",
            name: "salary"
        },
        {
            type: "input",
            message: "Input department id:",
            name: "department_id"
        }
    ]).then(function (response) {
        console.log(response);
    })
}

function addEmpl() {
    inquirer.prompt([
        {
            type: "input",
            message: "Input first name:",
            name: "fname"
        },
        {
            type: "input",
            message: "Input last name:",
            name: "lname"
        },
        {
            type: "input",
            message: "Input role id:",
            name: "role_id"
        },
        {
            type: "input",
            message: "Input manager id:",
            name: "manager_id"
        }
    ])
        .then(function (response) {
            console.log(response);
        })
}

function viewDept() {
    connection.query(query, function (err, res) {
        function(err, res) {
            if(err) throw err
            console.table(res)
            startPrompt()
        }
    });

}

function viewRole() {
    inquirer.prompt({
        name: "Role",
        type: "input",
        message: "View employees by <insert role>?"
    })
        .then(function (answer) {
            console.log(answer.role);
            connection.query("SELECT * FROM emptrack_db WHERE ?", { role: answer.role }, function (err, res) {
                if (err) throw err;
                // console.log(
                //     "Position: " +
                //     res[0].position +
                //     " || Song: " +
                //     res[0].song +
                //     " || Artist: " +
                //     res[0].artist +
                //     " || Year: " +
                //     res[0].year
                // );
                runSearch();
            });
        });
}

function viewEmpl() {
    connection.query("SELECT e.id, e.fname, e.lname, role.title, department.name AS department, role.salary, concat(m.fname, ' ' ,  m.lname) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC");
    function(err, res) {
        if (err) throw err;
        console.table(res)
        startPrompt();
    }
}



start();
