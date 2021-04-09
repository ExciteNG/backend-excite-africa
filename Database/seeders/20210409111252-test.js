'use strict';
const referralCodes = require('referral-codes');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
     await queryInterface.bulkInsert('Affiliate', 
     [
       {
          full_name: 'John Doe',
          refcode:referralCodes.generate({
            length: 8,
            count: 1
        }).join(''),
          email:'jane@gmail.com',
          phone_no:'+2347081927814',
          address:'lagos',
          state_of_origin:'usa',
          lga:'gra',
          means_of_id:'nin',
          passport:'zenn',
          password:'hello'

     }], {});
    
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
