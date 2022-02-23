const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    password:'Thunderrex24@' ,
    database: 'walmart'
});
module.exports = db;