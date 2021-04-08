module.exports = (sequelize, DataTypes) => {
  const MembershipPlan = sequelize.define(
    "MembershipPlan",
    {
      PlanName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },

      PlanPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
    },
    {
      //# Prevent table name change to plural
      freezeTableName: true,
    }
  );

  MembershipPlan.associate = (models) => {
    {
      MembershipPlan.hasOne(models.UserMembership, {
        onDelete: "CASCADE",
        foreignKey: "MembershipPlanID",
      });
      MembershipPlan.hasOne(models.ProductItem, {
        onDelete: "CASCADE",
        foreignKey: "ProductOwnerMembershipID",
      });
    }
  };

  MembershipPlan.sync().then(() => {
    console.log("MembershipPlan Has been Synced");
  });
  return MembershipPlan;
};
