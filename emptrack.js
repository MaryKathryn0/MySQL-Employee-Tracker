const mysql = require("mysql");

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

//the user is prompted on whether they would like to "POST AN ITEM" or "BID ON AN ITEM"

connection.connect(function (err) {
    if (err) throw err;
})