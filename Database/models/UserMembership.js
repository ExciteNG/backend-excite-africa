module.exports = (sequelize, DataTypes) => {
  const UserMembership = sequelize.define(
    "UserMembership",
    {
      UserAccountMembershipID: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: "User",
        },
      },

      MembershipPlanID: {
        type: DataTypes.INTEGER,
        references: {
           // This is a reference to another model
          model: "MembershipPlan",
        },
      },

      PlanID: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      //# Prevent table name change to plural
      freezeTableName: true,
    }
  );
  UserMembership.associate = (models) => {
    {
      UserMembership.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "UserAccountMembershipID",
      });
 
      UserMembership.belongsTo(models.MembershipPlan, {
        onDelete: "CASCADE",
        foreignKey: "MembershipPlanID",
      });
    }  
  };

  UserMembership.sync().then(()=>{
    console.log('UserMembership Has been Synced')
})

  return UserMembership;
};
