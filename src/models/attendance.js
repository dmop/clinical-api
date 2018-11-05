'use strict';
module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
        weekDay: DataTypes.INTEGER,
        weekDayText: DataTypes.STRING
    }, {});
    Attendance.associate = function (models) {
        // associations can be defined here
        Attendance.belongsTo(models.Rule, {
            foreignKey: 'ruleId',
            onDelete: 'CASCADE',
        });
    };
    return Attendance;
};
