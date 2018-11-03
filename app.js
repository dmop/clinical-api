'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');

//Loading config
require('dotenv').load();

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");
        res.setHeader('Access-Control-Allow-Credentials', false);
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.end();
    } else {
        next();
    }
});

require('./routes')(app); //Routes


const PORT = process.env.SERVER_PORT;
server.listen(PORT,() => {
    console.log(`Clinical API has been started on http://localhost:${PORT}`);
});
