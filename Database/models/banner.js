'use strict';

module.exports = (sequelize,DataTypes) =>{


    const Banner = sequelize.define('banner',{

      category: DataTypes.STRING,
      banner:{
        type:DataTypes.STRING,
        allowNull:false
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











// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Banner extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Banner.init({
//     category: DataTypes.STRING,
//     banner: DataTypes.STRING,
//     purpose: DataTypes.STRING,
//     approved: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Banner',
//   });
//   return Banner;
// };
