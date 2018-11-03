'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule_Schedule = sequelize.define('Rule_Schedule', {
  }, {});
  Rule_Schedule.associate = function(models) {
    // associations can be defined here
      Rule_Schedule.belongsTo(models.Rule, {
          foreignKey: 'ruleId',
          onDelete: 'CASCADE',
      });
      Rule_Schedule.belongsTo(models.Schedule, {
          foreignKey: 'scheduleId',
          onDelete: 'CASCADE',
      });
  };
  return Rule_Schedule;
};
