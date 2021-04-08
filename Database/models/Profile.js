module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      UserAccountID: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: "User",
        },
      },

      Bio: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      BusinessAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      FacebookLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      InstagramLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      TwitterLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AnyshareProfileKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AnyshareProfileJWTToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      //# Prevent table name change to plural
      freezeTableName: true,
    }
  );
  Profile.associate = (models) => {
    {
        Profile.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "UserAccountID",
      });
    }
  };

  
  Profile.sync().then(() => {
    console.log('Profile Has been Synced')
  });
  return Profile;
};
