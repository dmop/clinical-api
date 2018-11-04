'use strict';

const Rule = require('../models').Rule;
const Interval = require('../models').Interval;
const WeekDay = require('../models').WeekDay;
const moment = require('moment');
const {weekDayToWeekNumber} = require('../helpers');

const RulesController = function () {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    const all = async function (req, res) {
        try {
            let rules = await Rule.all();

            res.status(200).send(rules);
        } catch (err) {
            res.status(400)
                .send({
                    message: err.message,
                    error: true
                });
        }
    };

    return {
        all
    }
};

module.exports = RulesController;
