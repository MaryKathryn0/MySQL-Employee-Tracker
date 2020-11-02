const inquirer = require("inquirer");

const choices = ["View All Employees", "View All Employees by Department", "View All Employees by Manager",
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

function getDeptId(connection, dept) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT id FROM department where department.name = ?", dept, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function addRole(connection, roleInfo, deptID) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "INSERT INTO role (title, salary, department_id)";
        sqlQuery += "VALUES (?, ?, ?)";
        connection.query(sqlQuery, [roleInfo.title, roleInfo.salary, deptID], function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function getRoles(connection) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT title FROM role", function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function selectRole(roles) {
    roleList = roles.map(el => el.title);
    return inquirer.prompt([{
        type: "list",
        message: "select role",
        name: "role",
        choices: roleList
    }])
}

function getRoleId(connection, role) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT id FROM role WHERE title = ?", role, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

// write function that returns a promise with a query of DELETE FROM role WHERE id = ?
function deleteRole(connection, role_id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM role WHERE id = ?", role_id, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}
//view all employees
function getEmployees(connection) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department,"
        sqlQuery += " role.salary, CONCAT(mng.first_name, ' ', mng.last_name) AS manager"
        sqlQuery += " FROM employee AS emp"
        sqlQuery += " INNER JOIN role on emp.role_id = role.id"
        sqlQuery += " INNER JOIN department ON role.department_id = department_id"
        sqlQuery += " LEFT JOIN employee as mng ON emp.manager_id = mng.id"

        connection.query(sqlQuery, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function emplByDept(connection, department) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, CONCAT(mng.first_name, ' ', mng.last_name) AS manager";
        sqlQuery += " FROM employee AS emp INNER JOIN role ON emp.role_id = role.id"
        sqlQuery += " INNER JOIN department on role.department_id = department.id LEFT JOIN employee AS mng ON emp.manager_id = mng.id"
        sqlQuery += " WHERE department.name = ?"
        connection.query(sqlQuery, department, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function getManager(connection) {
    // list should display ONE column of first AND last name = CONCAT
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT CONCAT(emp.first_name, ' ', emp.last_name) AS name FROM employee AS emp WHERE manager_id IS NULL"
        connection.query(sqlQuery, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function selectManager(mngs) {
    return inquirer.prompt([{
        type: "list",
        message: "select manager",
        name: "manager",
        choices: mngs
    }])
}

function getEmpsByManager(connection, mng) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT CONCAT(emp.first_name, ' ', emp.last_name) AS name FROM employee AS emp"
        sqlQuery += " LEFT JOIN employee AS mng ON emp.manager_id = mng.id"
        sqlQuery += " WHERE CONCAT(mng.first_name, ' ', mng.last_name) = ?";
        connection.query(sqlQuery, mng, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function getEmplName() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Input first name:",
            name: "first_name"
        },
        {
            type: "input",
            message: "Input last name:",
            name: "last_name"
        }
    ])
}

function selectEmpManager(mngs) {
    mngs.unshift("None");
    return inquirer.prompt([{
        type: "list",
        message: "select manager",
        name: "manager",
        choices: mngs
    }])
}

function getEmpId(connection, emp) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)= ?", emp, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

function addEmployee(connection, empName, roleID, mngID) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "INSERT INTO employee (first_name,last_name,role_id,manager_id)"
        sqlQuery += " VALUES (?, ?, ?, NULLIF(?,0))";
        connection.query(sqlQuery, [empName.first_name, empName.last_name, roleID, mngID], function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
}

// function selectEmployee(roles) {
//     employeeeList = employees.map(el => el.empName);
//     return inquirer.prompt([{
//         type: "list",
//         message: "select employee",
//         name: "employee",
//         choices: employeeList
//     }])
// }


module.exports = {
    askMainMenu,
    getDepartment,
    askRoleInfo,
    selectDepartment,
    getDeptId,
    addRole,
    getRoles,
    selectRole,
    getRoleId,
    deleteRole,
    getEmployees,
    emplByDept,
    getManager,
    selectManager,
    getEmpsByManager,
    getEmplName,
    selectEmpManager,
    getEmpId,
    addEmployee
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



// function viewDept() {

// }

// function viewRole() {
//     
// }

// function viewEmpl() {
//}
