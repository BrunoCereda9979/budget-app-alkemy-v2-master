const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const morgan = require('morgan');
const app = express();

// Config
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'));

// Endpoints
app.get('/api', (req, res) => {
    res.json({
        'status': 200,
        'message': 'hello from the server'
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})