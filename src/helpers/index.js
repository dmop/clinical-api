'use strict';
const moment = require('moment');

/**
 *
 * @param weekNumber
 * @returns {any}
 */
const weekNumberToWeekday = function (weekNumber) {

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[weekNumber];
};


/**
 *
 * @param weekDay
 * @returns {any}
 */
const weekDayToWeekNumber = function (weekDay) {
    const weekday = new Array(7);
    weekday['Sunday'] = 0;
    weekday['Monday'] = 1;
    weekday['Tuesday'] = 2;
    weekday['Wednesday'] = 3;
    weekday['Thursday'] = 4;
    weekday['Friday'] = 5;
    weekday['Saturday'] = 6;

    return weekday[weekDay];
};

/**
 *
 * @param startDate
 * @param endDate
 * @param format
 * @returns {Array}
 */
const enumerateDaysBetweenDates = function (startDate, endDate, format = 'DD-MM-YYYY') {
    let now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format(format));
        now.add(1, 'days');
    }
    return dates;
};

const weekOfMonth = function (m) {
    return m.week() - moment(m).startOf('month').week() + 1;
};

const getISOWeekInMonth = function (date) {
    // Copy date so don't affect original
    let d = new Date(+date);
    if (isNaN(d)) return;
    // Move to previous Monday
    d.setDate(d.getDate() - d.getDay() + 1);
    // Week number is ceil date/7
    // return {month: +d.getMonth()+1,
    //     week: Math.ceil(d.getDate()/7)};
    return Math.ceil((d.getDate() / 7)+1);
};

module.exports = {
    weekNumberToWeekday,
    weekDayToWeekNumber,
    enumerateDaysBetweenDates,
    weekOfMonth,
    getISOWeekInMonth
};
