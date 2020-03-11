'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trip_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      },
      driver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'drivers',
          key: 'id'
        }
      },
      trip_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "trips",
          key: "id"
        }
      },
      total_amount: {
        type: Sequelize.INTEGER
      },
      driver_rating: {
        type: Sequelize.STRING
      },

      createdAt: { type: Sequelize.DATE, field: "created_at" },
      updatedAt: { type: Sequelize.DATE, field: "updated_at" }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('trip_details');

  }
};
