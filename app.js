'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

//Loading config
require('dotenv').load();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app); //Routes


const PORT = process.env.SERVER_PORT;
server.listen(PORT,() => {
    console.log(`Clinical API has been started on http://localhost:${PORT}`);
});
