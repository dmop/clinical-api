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
    const create = async function (req, res) {

        try {

            const type = req.body.type; // oneDay | daily | weekly | biweekly | monthly
            const startDate = moment(req.body.startDate, "DD/MM/YYYY");
            const endDate = moment(req.body.endDate, "DD/MM/YYYY");
            const intervals = req.body['intervals'];
            let weekDays = [{"day": "all"}];

            if (type !== 'oneDay' && type !== 'daily') {
                weekDays = req.body['weekDays'];
            }

            const newRule = {
                type,
                startDate,
                endDate,
            };

            const ruleResult = await Rule.create(newRule);
            const ruleId = ruleResult.id;

            let intervalsPromises = [];
            for (const interval of intervals) {
                const startTime = interval['startTime'];
                const endTime = interval['endTime'];

                const newInterval = {
                    startTime,
                    endTime,
                    ruleId
                };
                intervalsPromises.push(Interval.create(newInterval))
            }
            await Promise.all(intervalsPromises);

            let weekDaysPromises = [];
            for (const weekDay of weekDays) {
                const weekDayText = weekDay['day'];
                let weekDayNumber = 99;

                if (weekDayText !== 'all') weekDayNumber = weekDayToWeekNumber(weekDayText);

                const newDay = {
                    weekDayNumber,
                    weekDayText
                };
                weekDaysPromises.push(WeekDay.create(newDay))
            }
            await Promise.all(weekDaysPromises);

            res.status(200)
                .send({
                    message: "Regra criada com Sucesso!",
                    error: false
                });

        } catch (err) {

            res.status(400).send({
                message: err.message,
                error: true
            });
        }
    };

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    const remove = async function (req, res) {
        try {
            const ruleId = parseInt(req.params.id);
            let foundRule = await Rule.findById(ruleId);

            if (!foundRule) {
                res.status(404).send({
                    message: 'Regra não encontrada!',
                });
            }

            await foundRule.destroy();
            res.status(200)
                .send({
                    message: 'Regra excluída com sucesso!',
                    error: false
                });


        } catch (err) {
            res.status(400)
                .send({
                    message: err.message,
                    error: true
                });
        }
    };

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
        create,
        remove,
        all
    }
};

module.exports = RulesController;
