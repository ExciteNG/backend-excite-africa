'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('banner', 'UserBannerId', {
      type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: "User",
          key:"id"
        },
    });
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
