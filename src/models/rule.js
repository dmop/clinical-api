'use strict';
module.exports = (sequelize, DataTypes) => {
    const Rule = sequelize.define('Rule', {
        type: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE
    }, {});
    Rule.associate = function (models) {
        // associations can be defined here
        Rule.hasMany(models.Interval, {
            foreignKey: 'ruleId'
        });
    };
    return Rule;
};
