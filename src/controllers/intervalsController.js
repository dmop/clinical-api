'use strict';

const Rule = require('../models').Rule;
const Interval = require('../models').Interval;
const Attendance = require('../models').Attendance;
const moment = require('moment');
const _ = require('lodash');
const {enumerateDaysBetweenDates, getISOWeekInMonth} = require('../helpers');

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
            let dateRange = enumerateDaysBetweenDates(startDate, endDate);
            let daysAttendances = [];

            if (startDate && startDate.isBefore(moment() && endDate && endDate.isBefore(moment()))) {
                throw new Error('Data inválida!')
            }

            let rulesOneDay = Rule.findAll({
                where: {
                    type: 'oneDay'
                },
                attributes: ['id', 'day']
            });

            let rulesDaily = Rule.findAll({
                where: {
                    type: 'daily'
                },
                attributes: ['id']
            });

            let rulesWeekly = Rule.findAll({
                where: {
                    type: 'weekly'
                },
                attributes: ['id']
            });

            let rulesBiWeekly = Rule.findAll({
                where: {
                    type: 'biweekly'
                },
                attributes: ['id']
            });

            let rulesMonthly = Rule.findAll({
                where: {
                    type: 'monthly'
                },
                attributes: ['id']
            });

            // um dia
            await Promise.all(dateRange.map(async (day) => {
                await rulesOneDay.map(async (ruleOneDay) => {
                    let alreadyIn = false;

                    let actualOneDay = moment(ruleOneDay.day).format('DD-MM-YYYY');
                    if (actualOneDay === day) {

                        let intervalsSearch = await Interval.findAll({
                            where: {
                                ruleId: ruleOneDay.id
                            },
                            attributes: ['id', 'startTime', 'endTime']
                        });

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

                        let dayAttendance = {
                            day,
                            intervals
                        };

                        daysAttendances.map((dayCheck) => {
                            if (dayCheck.day === dayAttendance.day) {
                                alreadyIn = true;
                                intervals.map((interval) => {
                                    dayCheck.intervals.push(interval);
                                });
                            }
                        });

                        if (!alreadyIn) {
                            daysAttendances.push(dayAttendance)
                        }
                    }
                })
            }));

            // diario
            await Promise.all(dateRange.map(async (day) => {
                await rulesDaily.map(async (ruleDaily) => {
                    let alreadyIn = false;

                    let intervalsSearch = await Interval.findAll({
                        where: {
                            ruleId: ruleDaily.id
                        },
                        attributes: ['id', 'startTime', 'endTime']
                    });

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

                    let dayAttendance = {
                        day,
                        intervals
                    };

                    daysAttendances.map((dayCheck) => {
                        if (dayCheck.day === dayAttendance.day) {
                            alreadyIn = true;
                            intervals.map((interval) => {
                                dayCheck.intervals.push(interval);
                            });
                        }
                    });

                    if (!alreadyIn) {
                        daysAttendances.push(dayAttendance)
                    }
                })
            }));

            // semanal
            await Promise.all(dateRange.map(async (day) => {
                await rulesWeekly.map(async (ruleWeekly) => {
                    let alreadyIn = false;

                    let attendanceSearch = await Attendance.findAll({
                        where: {
                            ruleId: ruleWeekly.id
                        },
                        attributes: ['id', 'weekDay', 'weekDayText']
                    });
                    let attendanceDays = [];

                    for (let attendanceDay of attendanceSearch) {
                        attendanceDays.push(attendanceDay.weekDay);
                    }

                    let weekDay = moment(day, 'DD-MM-YYYY').weekday();

                    if (weekDay in attendanceDays) {
                        let intervalsSearch = await Interval.findAll({
                            where: {
                                ruleId: ruleWeekly.id
                            },
                            attributes: ['id', 'startTime', 'endTime']
                        });

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

                        let dayAttendance = {
                            day,
                            intervals
                        };

                        daysAttendances.map((dayCheck) => {
                            if (dayCheck.day === dayAttendance.day) {
                                alreadyIn = true;
                                intervals.map((interval) => {
                                    dayCheck.intervals.push(interval);
                                });
                            }
                        });

                        if (!alreadyIn) {
                            daysAttendances.push(dayAttendance)
                        }
                    }
                })
            }));


            // Quinzenal
            await Promise.all(dateRange.map(async (day) => {
                await rulesBiWeekly.map(async (ruleBiWeekly) => {
                    let alreadyIn = false;

                    let attendanceSearch = await Attendance.findAll({
                        where: {
                            ruleId: ruleBiWeekly.id
                        },
                        attributes: ['id', 'weekDay', 'weekDayText']
                    });
                    let attendanceDays = [];

                    for (let attendanceDay of attendanceSearch) {
                        attendanceDays.push(attendanceDay.weekDay);
                    }

                    let weekDay = moment(day, 'DD-MM-YYYY').weekday();

                    let dCurrent = moment(day, 'DD-MM-YYYY').toDate();
                    let weekOfMonth = getISOWeekInMonth(dCurrent);

                    if (weekDay in attendanceDays && (weekOfMonth === 2 || weekOfMonth === 4) ) {
                        let intervalsSearch = await Interval.findAll({
                            where: {
                                ruleId: ruleBiWeekly.id
                            },
                            attributes: ['id', 'startTime', 'endTime']
                        });

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

                        let dayAttendance = {
                            day,
                            intervals
                        };

                        daysAttendances.map((dayCheck) => {
                            if (dayCheck.day === dayAttendance.day) {
                                alreadyIn = true;
                                intervals.map((interval) => {
                                    dayCheck.intervals.push(interval);
                                });
                            }
                        });

                        if (!alreadyIn) {
                            daysAttendances.push(dayAttendance)
                        }
                    }
                })
            }));

            // mensal
            await Promise.all(dateRange.map(async (day) => {
                await rulesMonthly.map(async (ruleMonthly) => {
                    let alreadyIn = false;

                    let attendanceSearch = await Attendance.findAll({
                        where: {
                            ruleId: ruleMonthly.id
                        },
                        attributes: ['id', 'weekDay', 'weekDayText']
                    });
                    let attendanceDays = [];

                    for (let attendanceDay of attendanceSearch) {
                        attendanceDays.push(attendanceDay.weekDay);
                    }

                    let weekDay = moment(day, 'DD-MM-YYYY').weekday();

                    let dCurrent = moment(day, 'DD-MM-YYYY').toDate();
                    let weekOfMonth = getISOWeekInMonth(dCurrent);

                    if (weekDay in attendanceDays && weekOfMonth === 1) {
                        let intervalsSearch = await Interval.findAll({
                            where: {
                                ruleId: ruleMonthly.id
                            },
                            attributes: ['id', 'startTime', 'endTime']
                        });

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

                        let dayAttendance = {
                            day,
                            intervals
                        };

                        daysAttendances.map((dayCheck) => {
                            if (dayCheck.day === dayAttendance.day) {
                                alreadyIn = true;
                                intervals.map((interval) => {
                                    dayCheck.intervals.push(interval);
                                });
                            }
                        });

                        if (!alreadyIn) {
                            daysAttendances.push(dayAttendance)
                        }
                    }
                })
            }));

            daysAttendances = daysAttendances.filter(day => day.intervals.length > 0);
            if (!daysAttendances.length > 0) {
                res.status(404).send({
                    message: 'Horarios não encontrados!',
                });
            }
            res.status(200).send(daysAttendances);

        }
        catch
            (err) {
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
