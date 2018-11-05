'use strict';

const Rule = require('../models').Rule;
const Interval = require('../models').Interval;
const moment = require('moment');
const _ = require('lodash');
const {enumerateDaysBetweenDates} = require('../helpers');

const RulesController = function () {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    const all = async function (req, res) {
        try {

            const startDate = moment(req.body.startDate, "DD/MM/YYYY");
            const endDate = moment(req.body.endDate, "DD/MM/YYYY");

            if (startDate && startDate.isBefore(moment() && endDate && endDate.isBefore(moment()))) {
                throw new Error('Data inválida!')
            }

            let intervalsSearch = await Interval.all();

            let intervals = [];
            for (let interval of intervalsSearch) {

                const startTime = moment(interval['startTime'], 'HH:mm:ss').format('HH:mm');
                const endTime = moment(interval['endTime'], 'HH:mm:ss').format('HH:mm');

                let newInterval = {
                    start: startTime,
                    end: endTime
                };
                intervals.push(newInterval);
            }

            intervals = _.uniqBy(intervals, 'start');
            intervals = _.uniqBy(intervals, 'end');

            let dateRange = enumerateDaysBetweenDates(startDate, endDate);

            let result = [];
            for (let day of dateRange) {

                let dayHours = {
                    day,
                    intervals
                };
                result.push(dayHours);
            }
            result = result.filter(item => item.intervals.length > 0);

            if(!result.length > 0){
                res.status(404).send({
                    message: 'Horarios não encontrados!',
                });
            }
            res.status(200).send(result);

        } catch (err) {
            console.log(err);
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
