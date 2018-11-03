'use strict';

const Rule = require('../models').Rule;
const Interval = require('../models').Interval;
const moment = require('moment');

const RulesController = function () {

    const create = async function (req, res) {

        try {
            const type = req.body.type;
            const start_date = moment(req.body.start_date, "DD/MM/YYYY");
            const end_date = moment(req.body.end_date, "DD/MM/YYYY");
            const intervals = req.body['intervals'];

            const newRule = {
                type,
                start_date,
                end_date,
            };

            const ruleResult = await Rule.create(newRule);
            const ruleId = ruleResult.id;

            let promises = [];
            for (let i = 0; i < intervals.length; i++) {
                let interval = intervals[i];

                const start_time = interval['start_time'];
                const end_time = interval['end_time'];

                const newInterval = {
                    start_time,
                    end_time,
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

    return {
        create,
        remove
    }
};

module.exports = RulesController;
