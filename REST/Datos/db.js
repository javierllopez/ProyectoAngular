const mysql = require('mysql');
require('dotenv').config();
const { promisify} = require("util");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Número máximo de conexiones en el pool
    waitForConnections: true, // Esperar por conexiones si no hay disponibles en el pool
    queueLimit: 0 // Sin límite en la cantidad de conexiones en espera
});

pool.getConnection((err,connection) => {
    if (err){
        if(err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Conexion de datos perdida");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Demasiadas conexiones");
        }
        if (err.code === "ERRCONREFUSED"){
            console.error("La conexión fue rechazada");
        }
        if (err.code === "ER_DUP_ENTRY") {
            console.error("clave primaria duplicada");
        }

    }
    if (connection) connection.release();
    console.log("Conexión a base de datos exitosa");
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;