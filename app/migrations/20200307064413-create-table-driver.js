'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drivers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      driver_name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          len: {
            args: [3, 60],
            msg: "driver name should be between 3 to 60 characters"
          }
        }
      },
      mobile_number: {
        type: Sequelize.STRING,
        unique: true
      },
      rides_preferred: {
        type: Sequelize.JSON,
      },
      password: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.JSON
      },

      createdAt: { type: Sequelize.DATE, field: "created_at" },
      updatedAt: { type: Sequelize.DATE, field: "updated_at" }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('drivers');

  }
};
