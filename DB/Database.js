const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, // adjust as per your application's needs
    host: "138.197.7.241",
    user: "swsteam",
    password: "Sws@root@2024",
    database: "freight"
});

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
