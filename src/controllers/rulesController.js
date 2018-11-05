'use strict';

const Rule = require('../models').Rule;
const Interval = require('../models').Interval;
const Attendance = require('../models').Attendance;
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
            const intervals = req.body['intervals'];
            const day = type === 'oneDay' ? moment(req.body.day, "DD/MM/YYYY") : null;
            let attendanceDays = [{"day": "all"}];
            if (type !== 'oneDay' && type !== 'daily') {
                attendanceDays = req.body['attendanceDays'];
            }

            if (day && day.isBefore(moment())) {
                throw new Error('Data inválida!')
            }

            const newRule = {
                type,
                day
            };

            const ruleResult = await Rule.create(newRule);
            const ruleId = ruleResult.id;

            await Promise.all(intervals.map(async (interval) => {
                    const startTime = interval['startTime'];
                    const endTime = interval['endTime'];

                    const newInterval = {
                        startTime,
                        endTime,
                        ruleId
                    };
                    await Interval.create(newInterval)
                })
            );

            await Promise.all(attendanceDays.map(async (attendance) => {
                    const weekDayText = attendance['day'];
                    let weekDay = null;

                    if (weekDayText !== 'all') weekDay = weekDayToWeekNumber(weekDayText);

                    const newAttendance = {
                        weekDay,
                        weekDayText,
                        ruleId
                    };
                    await Attendance.create(newAttendance);
                })
            );

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
            let rules = await Rule.findAll({
                attributes: ['id', 'type', 'day']
            });
            let result = [];
            await Promise.all(rules.map(async (rule) => {
                    let interval = await Interval.findAll({
                        where: {
                            ruleId: rule.id
                        },
                        attributes: ['id', 'startTime', 'endTime']
                    });

                    let attendanceDays = await Attendance.findAll({
                        where: {
                            ruleId: rule.id
                        },
                        attributes: ['id', 'weekDay', 'weekDayText']
                    });
                    let day = rule.day ? moment(rule.day).format('DD-MM-YYYY') : null;
                    result.push({id: rule.id, type: rule.type, day: day, intervals: interval, days: attendanceDays})
                })
            );

            if (!result.length > 0) {
                res.status(404).send({
                    message: 'Regras não encontradas!',
                });
            }
            res.status(200).send(result);
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
