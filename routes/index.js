'use strict';

const rulesRoutes = require('./rules');
const intervalsRoutes = require('./intervals');

module.exports = function (app) {

    app.use('/rules', rulesRoutes);
    app.use('/intervals', intervalsRoutes);

    app.get('/', (req, res) => {
        res.status(200).json({"message": `Welcome to Clinical API v${process.env.VERSION}`});
    });

};
