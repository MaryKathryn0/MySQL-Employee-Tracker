const inquirer = require("inquirer");

const choices=["View All Employees", "View All Employees by Department", "View All Employees by Manager",
"Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager",
"View All Roles", "Add Role", "Remove Role",
"View All Departments", "Add Department", "Remove Department", "Exit"];

function askMainMenu() {
    return inquirer.prompt([{
        type: "list",
        message: "Select a menu option",
        name: "menu",
        choices: choices
    }
    ])
}

function getDepartment(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT name FROM department", function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function askRoleInfo() {
    return inquirer.prompt([{
        type: "input",
        message: "role title",
        name: "title"
    }, {
        type: "input",
        message: "salary total",
        name: "salary"
    }])
}

function selectDepartment(deptList) {
    return inquirer.prompt([{
        type: "list",
        message: "select department",
        name: "dept",
        choices: deptList
    }])
}

function getDeptId(connection, dept){
    return new Promise((resolve, reject)=>{
        connection.query("SELECT id FROM department where department.name = ?", dept, function(err,data){
            if(err)
            reject(err);
            else
            resolve(data);
        })
    })
}


module.exports = {
    askMainMenu,
    getDepartment,
    askRoleInfo,
    selectDepartment,
    getDeptId
}

// function addDept() {
//     inquirer.prompt({
//         type: "input",
//         message: "Input department name"
//     })
//         .then(function (response) {
//             console.log(response);
//         })
// }

// function getDepartments(connection) {
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT name FROM department", function (err, data) {
//             if (err)
//                 reject(err);
//             else
//                 resolve(data);
//         })
//     })
// }

// async function addRole() {
//     deptList = await getDepartments();
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "Input role title:",
//             name: "title"
//         },
//         {
//             type: "input",
//             message: "Input salary:",
//             name: "salary"
//         },
//         {
//             type: "list",
//             message: "Choose Department:",
//             name: "department_name",
//             choices: deptList
//         }
//     ]).then(function (response) {
//         console.log(response);
//     })
// }

// function addEmpl() {
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "Input first name:",
//             name: "first_name"
//         },
//         {
//             type: "input",
//             message: "Input last name:",
//             name: "last_name"
//         },
//         {
//             type: "input",
//             message: "Input role id:",
//             name: "role_id"
//         },
//         {
//             type: "input",
//             message: "Input manager id:",
//             name: "manager_id"
//         }
//     ])
//         .then(function (response) {
//             console.log(response);
//         })
// }

// function viewDept() {

// }

// function viewRole() {
//     
// }

// function viewEmpl() {
//}
