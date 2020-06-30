'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: {
        allowNull: false,
        type: Sequelize.NUMBER
      },
      checkout_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      OrderId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};