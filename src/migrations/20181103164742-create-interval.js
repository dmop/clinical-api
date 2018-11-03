'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Intervals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            start_time: {
                type: Sequelize.TIME
            },
            end_time: {
                type: Sequelize.TIME
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
        return queryInterface.dropTable('Intervals');
    }
};
