const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// New Connection
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budget-app-db',
});

// Connect to Database
connection.connect((err) => {
    if (err) throw Error('Cant connect to dabase');
    console.log('Connected to database...');
});

// Get the first 10 operations
router.get('', (req, res) => {
    if (connection.state === 'authenticated') {
        connection.query('SELECT * FROM `operations` LIMIT 0, 10', (err, result) => {
            if (err) {
                res.status(500).json({
                    'message': 'Could not query data from the database'
                })
            }
            else {
                res.status(200).json({
                    'status': 200,
                    'message': {
                        result
                    }
                });             
            }
        });
    }
    else {
        res.status(500).json({
            'message': 'Sorry, there is an error with the server'
        })
    }
});

// Post a new operation
router.post('', (req, res) => {
    const newOperation = {
        'description': req.body.operationDesc,
        'amount': req.body.operationAmount,
        'date': req.body.operationDate,
        'type': req.body.operationType
    }

    const sql = "INSERT INTO `operations` (`operation_desc`, `operation_amount`, `operation_date`, `operation_type`) VALUES (?, ?, ?, ?)";
    let values = [newOperation.description, newOperation.amount, newOperation.date, newOperation.type];

    connection.query(sql, values, (errors, results, fields) => {
        if (errors) {
            res.status(500).json({
                'status': 500,
                'message': 'There is an error with the query' 
            });
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
});

// Delete one operation by ID
router.delete('', (req, res) => {
    const sql = "DELETE FROM `operations` WHERE operation_id = ?";
    let value =  req.body.operationId;
    console.log(`This is the ID of the operation to be deleted ${req.body.operationId}`);

    connection.query(sql, value, (errors, results, fields) => {
        if (errors) {
            res.status(500).json({
                'status': 500,
                'message': 'There is an error with the query' 
            });
        }
        else {
            res.status(200).json({
                'status': 200,
                'message': {
                    results
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

    connection.query(sql, values, (errors, results, fields) => {
        if (errors) {
            res.status(500).json({
                'status': 500,
                'message': 'There is an error with the query' 
            });
        }
        else {
            res.status(200).json({
                'status': 200,
                'message': {
                    results
                }
            });
        }
    });
});

/********** INCOMES & EXPENSES ***********/
router.get('/incomes', (req, res) => {
    if (connection.state === 'authenticated') {
        connection.query("SELECT * FROM `operations` WHERE operation_type = 'income'", (err, result) => {
            if (err) {
                res.status(500).json({
                    'message': 'Could not query data from the database'
                })
            }
            else {
                res.status(200).json({
                    'status': 200,
                    'message': {
                        result
                    }
                });             
            }
        });
    }
    else {
        res.status(500).json({
            'message': 'Sorry, there is an error with the server'
        })
    }
});

router.get('/expenses', (req, res) => {
    if (connection.state === 'authenticated') {
        connection.query("SELECT * FROM `operations` WHERE operation_type = 'expense'", (err, result) => {
            if (err) {
                res.status(500).json({
                    'message': 'Could not query data from the database'
                })
            }
            else {
                res.status(200).json({
                    'status': 200,
                    'message': {
                        result
                    }
                });             
            }
        });
    }
    else {
        res.status(500).json({
            'message': 'Sorry, there is an error with the server'
        })
    }
});

module.exports = router;