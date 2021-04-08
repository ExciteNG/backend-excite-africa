"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("ProductItem", "SubCategory", {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      }),
      queryInterface.addColumn("ProductItem", "Brand", {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      }),
      queryInterface.addColumn("ProductItem", "Gender", {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      }),
      queryInterface.addColumn("ProductItem", "Room", {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      }),
      queryInterface.addColumn("ProductItem", "Condition", {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
