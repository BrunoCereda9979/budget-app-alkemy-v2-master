const { response } = require('express');
const mysql = require('mysql');

const stablishConnection = () => {
    return new Promise((reject, resolve) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'budget-app-db',
        });
        connection.connect((err) => {
            if (err) reject(err);
            resolve(connection);
        });
    });
}

const closeConnection = (connection) => {
    connection.destroy();
}

module.exports = stablishConnection, closeConnection;