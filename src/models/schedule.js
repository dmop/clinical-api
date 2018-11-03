'use strict';
module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE
    }, {});
    Schedule.associate = function (models) {
        // associations can be defined here
        // Schedule.belongsTo(models.Rule, {
        //     foreignKey: 'ruleId',
        //     onDelete: 'CASCADE',
        // });
        Schedule.hasMany(models.Rule_Schedule, {
            foreignKey: 'ruleScheduleId'
        });
    };
    return Schedule;
};
