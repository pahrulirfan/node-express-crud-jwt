// Ambil plugin dotenv
require('dotenv').config();
const mysql = require('mysql2');

// Gunakan plugin dotenv untuk mengambil
// nilai variable dari file .env
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = db.promise();