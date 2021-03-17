const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Routes
const operationsRoutes = require('./routes/operations');

// Config
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'));

// Route Handling
app.use('/api/operations', operationsRoutes);

// Server listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})