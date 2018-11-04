'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('WeekDays', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            weekDayNumber: {
                type: Sequelize.INTEGER
            },
            weekDayText: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            ruleId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Rules',
                    key: 'id',
                    as: 'ruleId',
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('WeekDays');
    }
};
