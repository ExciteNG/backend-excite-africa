'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     // await queryInterface.bulkInsert('banner', [{
     // category: 'Electronics',
     // banner: 'jpg',
     // User:1,
     // purpose:'to sell goods',
     // approved:true
     // }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
