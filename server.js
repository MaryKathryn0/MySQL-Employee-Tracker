var mysql = require("mysql");
var { askMainMenu, getDepartment, selectDepartment, askRoleInfo, getDeptId,
addRole, getRoles, selectRole, getRoleId, deleteRole  } = require("./functions/allfunctions");
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

async function start(){
    const {menu} = await askMainMenu();
    if(menu==="Add Role"){
        // User gives name and salary of new role
        roleInfo = await askRoleInfo();
        //console.log("Role Info: ", roleInfo);
        // database queried for all exisiting department
        deptList = await getDepartment(connection);
        //console.log("Deptartment List: ", deptList);
        // user is asked to select a department
        deptSelected = await selectDepartment(deptList);
        //console.log("Department Selected: ", deptSelected);
        // query database for ID of selected department
        deptID = await getDeptId(connection, deptSelected.dept);
        //console.log("Department ID: ", deptID);
        // add role to database
        results = await addRole(connection,roleInfo,deptID[0].id)
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if(menu === "View All Roles"){
        // display all roles in the database
        roleList = await getRoles(connection);
        console.table(roleList);
        start();
    }
    else if(menu === "Remove Role"){
        //get roles to display
        roleList = await getRoles(connection);
        //console.log("Role List: ", roleList);
        //select role
        roleSelected = await selectRole(roleList);
        //console.log("Role Selected: ", roleSelected);
        //get id of role
        roleID = await getRoleId(connection, roleSelected.role);
        //console.log("Role ID: ", roleID);
        //remove role
        results = await deleteRole(connection,roleID[0].id)
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
}

// function start() {


//     inquirer.prompt([
//         {
//             type: "list",
//             message: "Choose from the following actions:",
//             name: "action",
//             choices: [
//                 "Add departments",
//                 "Add roles",
//                 "Add employees",
//                 "View employees by department",
//                 "View employees by role",
//                 "View all employees",
//                 "Update employee role",
//                 "Exit"
//             ]
//         },
//     ])
//         .then(async function (response) {

//             switch (response.action) {
//                 case "Add departments":
//                     //addDept();
//                     start()
//                     break;

//                 case "Add roles":
//                     results = await addRole(connection);
//                     console.log(`Inserted ${results.affectedRows} entries`);
//                     start()
//                     break;

//                 case "Add employees":
//                     //addEmpl();
//                     start()
//                     break;

//                 case "View departments":
//                     //viewDept();
//                     start()
//                     break;

//                 case "View roles":
//                     //viewRole();
//                     start()
//                     break;

//                 case "View employees":
//                     //viewEmpl();
//                     start()
//                     break;

//                 case "Update employee role":
//                     //updateRole();
//                     start();
//                     break;

//                 case "Exit":
//                     //exit();
//                     start();
//                     break;
//             }
//         });
// }





// connect to the mysql server and sql database
connection.connect(async () => start());


// Variables/File Delcartion TOP

// Function Definitions MIDDLE

// Function Calls BOTTOM

// JavaScript doesn't care about placement, other languages do!