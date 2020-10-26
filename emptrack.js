var mysql = require("mysql");
var db = require("./database")
var inquirer = require("inquirer");


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
                "View departments",
                "View roles",
                "View employees",
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
                    addDept();
                    break;

                case "View roles":
                    addRole();
                    break;

                case "View employees":
                    addEmpl();
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



start();
