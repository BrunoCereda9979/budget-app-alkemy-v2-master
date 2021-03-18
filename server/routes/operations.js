const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Connection to Dabatabase
let connection = mysql.createConnection({
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
                    console.log('---Cant close connection to database' + err);
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
                connection.end((err) => {
                    if (err) {
                        console.log('Cant close connection to database' + err);
                    }   
                });
            });
        }
    });
});

// Post a new operation
router.post('', (req, res) => {
    console.log('New operation requuest body:' + req.body);
    const newOperation = {
        'description': req.body.operationDesc,
        'amount': req.body.operationAmount,
        'date': req.body.operationDate,
        'type': req.body.operationType
    }

    const sql = "INSERT INTO `operations` (`operation_desc`, `operation_amount`, `operation_date`, `operation_type`) VALUES (?, ?, ?, ?)";
    let values = [newOperation.description, newOperation.amount, newOperation.date, newOperation.type];

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
            connection.query(sql, values, (errors, results, fields) => {
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
            });
        }
    });
});

// Delete one operation by ID
router.delete('', (req, res) => {
    const sql = "DELETE FROM `operations` WHERE operation_id = ?";
    let value =  req.body.operationId;

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
            connection.query(sql, value, (errors, results, fields) => {
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
            });
        }
    });    
});

// Edit one operation
router.put('', (req, res) => {
    let newOperation = req.body;
    let sql = "UPDATE `operations` SET operation_desc = ?, operation_amount = ?, operation_date = ?, operation_type = ? WHERE operation_id = ?";
    let values = [newOperation.operationDesc, newOperation.operationAmount, newOperation.operationDate, newOperation.operationType, newOperation.operationId];

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
            connection.query(sql, values, (errors, results, fields) => {
                if (errors) {
                    res.status(500).json({
                        'status': 500,
                        'message': 'There is an error with the query' 
                    })
                    console.log(errors);
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
            });
        }
    });
});

module.exports = router;