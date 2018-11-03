'use strict';
const ruleService = require('../services/ruleService')();
const Rule = require('../models').Rule;
const Schedule = require('../models').Schedule;
const RuleSchedule = require('../models').RuleSchedule;

const RulesController = function () {

    const create = async function (req, res) {
        try {

            console.log(req.body);
            await Rule.create();
            // const user = userService.getUserByToken(req.headers['authorization']);
            // res.status(201).send(await service.create(req.body, user))
            res.json(req.body);
        } catch (err) {

            console.log(err);
            // res.status(400).send({
            //     message: err.message,
            //     error: true
            // });
        }
    };

    return {
        create
    }
};

module.exports = RulesController;
