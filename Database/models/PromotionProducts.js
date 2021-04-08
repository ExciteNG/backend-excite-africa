module.exports = (sequelize, DataTypes) => {
    const PromotionItem = sequelize.define(
      "PromotionItem",
      {
        PromotionItemUserID: {
          type: DataTypes.INTEGER,
          references: {
            // This is a reference to another model
            model: "User",
          },
        },
        PromotionItemOwnerMembershipID: {
            type: DataTypes.INTEGER,
            references: {
              // This is a reference to another model
              model: "MembershipPlan",
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

  
         SubCategory: {
          type: DataTypes.STRING,
          allowNull: true,
        },
  
        Brand: {
          type: DataTypes.STRING,
          allowNull: true,
        },
  
        isDeal: {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
      },
  
      {
        //# Prevent table name change to plural
        freezeTableName: true,
      }
    );
    PromotionItem.associate = (models) => {
      {
        PromotionItem.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: "PromotionItemUserID",
        });
  
        PromotionItem.belongsTo(models.MembershipPlan, {
          onDelete: "CASCADE",
          foreignKey: "PromotionItemOwnerMembershipID",
        });
      }
    };
  
    PromotionItem.sync().then(() => {
      console.log("PromotionItem Has been Synced");
    });
    return PromotionItem;
  };
  