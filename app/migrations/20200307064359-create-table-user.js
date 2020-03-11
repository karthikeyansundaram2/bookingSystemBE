'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          len: {
            args: [3, 60],
            msg: "Username should be between 3 to 60 characters"
          }
        }
      },
      mobile_number: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.TEXT,
      },
     
      createdAt: { type: Sequelize.DATE, field: "created_at" },
      updatedAt: { type: Sequelize.DATE, field: "updated_at" }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');

  }
};
