'use strict';

const Rule = require('../models').Rule;
const Interval = require('../models').Interval;
const moment = require('moment');

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

            const newRule = {
                type,
                startDate,
                endDate,
            };

            const ruleResult = await Rule.create(newRule);
            const ruleId = ruleResult.id;

            let promises = [];

            for (const interval of intervals) {

                const startTime = interval['startTime'];
                const endTime = interval['endTime'];

                const newInterval = {
                    startTime,
                    endTime,
                    ruleId
                };
                promises.push(Interval.create(newInterval))
            }
            await Promise.all(promises);

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
