'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rule = sequelize.define('Rule', {
        type: DataTypes.STRING,
        day: DataTypes.DATE
    }, {});
    Rule.associate = function (models) {
        // associations can be defined here
        Rule.hasMany(models.Interval, {
            foreignKey: 'ruleId'
        });
        Rule.hasMany(models.Attendance, {
            foreignKey: 'ruleId'
        });
    };
    return Rule;
};
