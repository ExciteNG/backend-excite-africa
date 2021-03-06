const referralCodes = require('referral-codes');

module.exports = (sequelize,DataTypes) =>{


    const Affiliate = sequelize.define('affiliate',{

        full_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        refcode:{
            type:DataTypes.STRING,
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
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail: {
                    msg:"this field must be an email"
                }
            }
        },
        phone_no:{
            type:DataTypes.STRING,
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
            type:DataTypes.STRING,
        },
        state_of_origin:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lga:{
            type:DataTypes.STRING
        },
        means_of_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        passport:{
            type:DataTypes.STRING
        },

        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        //Prevent table name change to plural
        freezeTableName: true,
})
    
    return Affiliate

}
