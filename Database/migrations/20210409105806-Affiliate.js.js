'use strict';
const referralCodes = require('referral-codes');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     */
     
      await queryInterface.createTable('Affiliate', {

        full_name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        refcode:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true,
            primaryKey:true,
            default:referralCodes.generate({
                length: 8,
                count: 1
            }).join(''),
            noUpdate:true
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail: {
                    msg:"this field must be an email"
                }
            }
        },
        phone_no:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true,
            validate:{
                is:{
                    args:['(\d{3})\D*(\d{3})\D*(\d{4})\D*(\d*)$','i'],
                    msg:"must be a valid phone number"
                }
            }
        },
        address:{
            type:Sequelize.STRING,
        },
        state_of_origin:{
            type:Sequelize.STRING,
            allowNull:false
        },
        lga:{
            type:Sequelize.STRING
        },
        means_of_id:{
            type:Sequelize.STRING,
            allowNull:false
        },
        passport:{
            type:Sequelize.STRING
        },

        password:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },
    {
        //Prevent table name change to plural
        freezeTableName: true,
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
