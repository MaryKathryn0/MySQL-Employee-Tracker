var mysql = require("mysql");
var { askMainMenu, getDepartment, selectDepartment, askRoleInfo, getDeptId,
    addRole, getRoles, selectRole, getRoleId, deleteRole, getEmployees,
    emplByDept, getManager, selectManager, getEmpsByManager, getEmplName,
    selectEmpManager, getEmpId, addEmployee, getEmployeeName, selectEmployee, updateRole, askNewDept, addDept } = require("./functions/allfunctions");
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

async function start() {
    const { menu } = await askMainMenu();
    if (menu === "Add Role") {
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
        results = await addRole(connection, roleInfo, deptID[0].id)
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "View All Roles") {
        // display all roles in the database
        roleList = await getRoles(connection);
        console.table(roleList);
        start();
    }
    else if (menu === "Remove Role") {
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
        results = await deleteRole(connection, roleID[0].id)
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "View All Employees") {
        //display all employees
        employeeList = await getEmployees(connection);
        console.table(employeeList);
        start();
    }
    else if (menu === "View All Departments") {
        // display all departments
        deptList = await getDepartment(connection);
        console.table(deptList);
        start();
    }
    else if (menu === "View All Employees by Department") {
        // get list of departments
        deptList = await getDepartment(connection);
        console.log("Dept List: ", deptList);
        // select a department
        deptSelected = await selectDepartment(deptList);
        // view employees in department
        results = await emplByDept(connection, deptSelected.dept);
        console.table(results);
        start();
    }
    else if (menu === "View All Employees by Manager") {
        //get list of managers
        mngList = await getManager(connection);
        console.log("Manager List", mngList);
        //select the manager
        mngSelected = await selectManager(mngList);
        console.log("Selected Manager", mngSelected);
        //show list of employees under that manager
        results = await getEmpsByManager(connection, mngSelected.manager);
        console.table(results);
        start();
    }
    else if (menu === "Add Employee") {
        //get name
        empName = await getEmplName();
        console.log("Add Employee",empName);
        //select role
        roleList = await getRoles(connection);
        roleSelected = await selectRole(roleList);
        roleID = await getRoleId(connection, roleSelected.role);
        //ask if manager
        mngList = await getManager(connection);
        mngSelected = await selectEmpManager(mngList);
        if(mngSelected.mng !== "None"){
            // if user DID NOT select None, get ID of manager
            mngID = await getEmpId(connection,mngSelected.manager);
            // add employee to database
            results = await addEmployee(connection,empName,roleID[0].id, mngID[0].id);
        }
        else{
            // if user DID select None, pass in 0 for manager
            results = await addEmployee(connection,empName,roleID[0].id, 0);
        }
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Update Employee Role"){
        //get list of employees
        employeeList = await getEmployeeName(connection);
        console.log(employeeList);
        // select employee
        emplSelected = await selectEmployee(employeeList);
        console.log(emplSelected);
        // get employee ID
        empId = await getEmpId(connection,emplSelected.employee);
        console.log(empId);
        // get list of Roles
        roleList = await getRoles(connection);
        // select role
        roleSelected = await selectRole(roleList);
        //get ID of role
        roleID = await getRoleId(connection, roleSelected.role);
        // update employee to new role
        results = await updateRole(connection, roleID[0].id, empId[0].id)
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Add Department") {
        // ask user for department name
        deptInfo = await askNewDept();
        console.log("Dept Info: ", deptInfo);
        // add department to database
        results = await addDept(connection, deptInfo.deptname)
        console.log(`Inserted ${results.affectedRows} entries`);
        start();
    }
    else if (menu === "Exit") {
        connection.end()
        console.clear()
        process.exit(0)
    }
}






// connect to the mysql server and sql database
connection.connect(async () => start());


// Variables/File Delcartion TOP

// Function Definitions MIDDLE

// Function Calls BOTTOM

// JavaScript doesn't care about placement, other languages do!