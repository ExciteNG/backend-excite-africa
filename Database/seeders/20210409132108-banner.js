'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Affiliate', [{
      
        "full_name": "Jane Doe",
        "refcode":"1011a",
        "email": "jone@gmail.com",
        "username": "emmii",
        "phone_no": "+2347081927814",
        "address": "lagos",
        "state_of_origin": "usa",
        "lga": "gra",
        "means_of_id": "nin",
        "passport": "zennww",
        "password": "hello",
        // "password2":"hello",
     createdAt:new Date(),
     updatedAt:new Date()
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
