module.exports = (sequelize, DataTypes) => {
  const ProductItem = sequelize.define(
    "ProductItem",
    {
      ProductForUserID: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: "User",
        }, 
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      Price: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      LGA: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      State: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
      Image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ProductOwnerMembershipID: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: "MembershipPlan",
        },
      },

       SubCategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      Gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Room: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Condition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      //# Prevent table name change to plural
      freezeTableName: true,
    }
  );
  ProductItem.associate = (models) => {
    {
      ProductItem.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "ProductForUserID",
      }); 

      ProductItem.belongsTo(models.MembershipPlan, {
        onDelete: "CASCADE",
        foreignKey: "ProductOwnerMembershipID",
      });
    }
  };

  ProductItem.sync().then(() => {
    console.log("ProductItem Has been Synced");
  });
  return ProductItem;
};
