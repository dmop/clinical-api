'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    type: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    // week_days: DataTypes.ARRAY
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    //   Rule.hasMany(models.Schedule, {
    //       foreignKey: 'scheduleId'
    //   });
      Rule.hasMany(models.Rule_Schedule, {
          foreignKey: 'ruleScheduleId'
      });
  };
  return Rule;
};
