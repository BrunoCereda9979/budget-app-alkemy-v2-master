const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const morgan = require('morgan');
const app = express();

// Config
const port = process.env.PORT || 3001;

// Database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budget-app-db',
});

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'));

// Endpoints
app.get('/api/operations', (req, res) => {
    connection.connect((err) => {
        if (err) {
            res.json({
                'status': 500,
                'message': 'There is an error with the database connection' 
            })
        }
        else {
            connection.query('SELECT * FROM `operations`', (errors, results, fields) => {
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
        }
    })
});

// Server listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})