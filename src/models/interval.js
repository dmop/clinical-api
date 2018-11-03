'use strict';
module.exports = (sequelize, DataTypes) => {
    const Interval = sequelize.define('Interval', {
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME
    }, {});
    Interval.associate = function (models) {
        // associations can be defined here
        Interval.belongsTo(models.Rule, {
            foreignKey: 'ruleId',
            onDelete: 'CASCADE',
        });
    };
    return Interval;
};
