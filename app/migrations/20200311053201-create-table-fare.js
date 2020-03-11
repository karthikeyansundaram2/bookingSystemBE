'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fare', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      from_location: {
        type: Sequelize.STRING,

      },
      to_location: {
        type: Sequelize.STRING,

      },

      total_amount: {
        type: Sequelize.INTEGER
      },


      createdAt: { type: Sequelize.DATE, field: "created_at" },
      updatedAt: { type: Sequelize.DATE, field: "updated_at" }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fare');

  }
};
