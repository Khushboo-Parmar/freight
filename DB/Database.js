const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "freight"
});

con.connect(function (err) {
    if (err) {
        console.error('Error connecting to database:');
        console.error(err.stack);
        return;
    }
    console.log('Connected to MySQL server as id ' + con.threadId);
});

module.exports = con;
