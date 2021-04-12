'use strict';

module.exports = (sequelize,DataTypes) =>{

    const Banner = sequelize.define('banners',{
      category: DataTypes.STRING,
      banner:{
        type:DataTypes.STRING,
        allowNull:false
      },
      UserBannerId: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: "User",
          key:"id"
        },
      },
      purpose: DataTypes.STRING,
      approved:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }

    },
    {
      freezeTableName: true,
    }

  )

    return Banner

}