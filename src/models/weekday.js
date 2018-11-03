'use strict';
module.exports = (sequelize, DataTypes) => {
    const WeekDay = sequelize.define('WeekDay', {
        weekDayNumber: DataTypes.INTEGER,
        weekDay: DataTypes.STRING
    }, {});
    WeekDay.associate = function (models) {
        // associations can be defined here
        WeekDay.belongsTo(models.Rule, {
            foreignKey: 'ruleId',
            onDelete: 'CASCADE',
        });
    };
    return WeekDay;
};
