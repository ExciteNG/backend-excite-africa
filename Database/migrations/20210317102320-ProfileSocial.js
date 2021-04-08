'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
           'Profile',
           'AnyshareProfileJWTToken',
           {
             type: Sequelize.STRING(10000),
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
