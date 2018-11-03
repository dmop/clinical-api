'use strict';

const rulesRoutes = require('./rules');

module.exports = function (app) {

    app.use('/rules', rulesRoutes);

    app.get('/', (req, res) => {
        res.status(200).json({"message": `Welcome to Clinical API v${process.env.VERSION}`});
    });

};
