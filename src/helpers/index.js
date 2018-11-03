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


module.exports = {
    weekNumberToWeekday,
    weekDayToWeekNumber
};
