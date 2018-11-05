'use strict';

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


module.exports = {
    weekNumberToWeekday,
    weekDayToWeekNumber,
    enumerateDaysBetweenDates
};
