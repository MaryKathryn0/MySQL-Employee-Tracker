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
    inquirer.prompt
}

function viewRole() {
    inquirer.prompt
}

function viewEmpl() {
    inquirer.prompt
}



start();
