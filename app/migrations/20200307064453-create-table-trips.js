'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trips', {
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
      trip_type: {
        type: Sequelize.ENUM,
        values: ['one-way', 'round', 'multicity', 'airport']
      },
      pickup_location: {
        type: Sequelize.STRING,
      },
      drop_location: {
        type: Sequelize.STRING
      },
      depart_date: {
        type: Sequelize.DATE
      },
      return_date: {
        type: Sequelize.DATE
      },
      createdAt: { type: Sequelize.DATE, field: "created_at" },
      updatedAt: { type: Sequelize.DATE, field: "updated_at" }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('trips');

  }
};
