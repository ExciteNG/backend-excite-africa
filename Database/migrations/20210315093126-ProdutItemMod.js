'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
           'ProductItem',
           'Category',
           {
             type: Sequelize.STRING,
             allowNull: true,
             unique: false,
           } ,        
       ),
     ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
