'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("ProductItem", "ProductOwnerMembershipID", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "MembershipPlan",
        },
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
  }
};
