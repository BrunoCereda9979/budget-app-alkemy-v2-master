const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budget-app-db',
});

// Get the first 10 operations
router.get('', (req, res) => {
    connection.connect((err) => {
        if (err) {
            res.json({
                'status': 500,
                'message': 'There is an error with the database connection' 
            })

            connection.end((err) => {
                if (err) {
                    console.log('Cant close connection to database' + err);
                } 
            })
        }
        else {
            connection.query('SELECT * FROM `operations` LIMIT 0, 10', (errors, results, fields) => {
                if (errors) {
                    res.status(500).json({
                        'status': 500,
                        'message': 'There is an error with the query' 
                    })
                }
                else {
                    res.status(200).json({
                        'status': 200,
                        'message': {
                            results
                        }
                    })
                }
            });

            connection.end((err) => {
                if (err) {
                    console.log('Cant close connection to database' + err);
                }   
            })
        }
    })
});

module.exports = router;