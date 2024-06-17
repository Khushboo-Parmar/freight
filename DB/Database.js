// const mysql = require('mysql');
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "freight"
//   });

//   con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });
//   module.exports = con;

// const mysql = require('mysql');

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "freight"
// });

// con.connect(function (err) {
//     if (err) {
//         console.error('Error connecting to database:');
//         console.error(err.stack);
//         return;
//     }
//     console.log('Connected to MySQL server as id ' + con.threadId);
// });

// module.exports = con;

const mysql = require('mysql');

<<<<<<< HEAD
const pool = mysql.createPool({
    connectionLimit: 10, // adjust as per your application's needs
=======
const con = mysql.createConnection({
>>>>>>> 9b7941321a2fdc385f1524d75e8b26bff3706d56
    host: "localhost",
    user: "root",
    password: "",
    database: "freight"
});

<<<<<<< HEAD
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection refused');
        }
    }
    if (connection) {
        connection.release();
    }
    return;
});

module.exports = pool;
=======
con.connect(function (err) {
    if (err) {
        console.error('Error connecting to database:');
        console.error(err.stack);
        return;
    }
    console.log('Connected to MySQL server as id ' + con.threadId);
});

module.exports = con;
>>>>>>> 9b7941321a2fdc385f1524d75e8b26bff3706d56
