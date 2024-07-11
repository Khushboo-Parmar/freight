const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit: 10, 
    host: "138.197.7.241",
    user: "swsteam",
    password: "Sws@root@2024",
    database: "freight"
});
// const pool = mysql.createPool({
//     connectionLimit: 10, 
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "freight"
// });

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

