module.exports = (sequelize, DataTypes) => {
    const BusinessRegistration = sequelize.define(
      "BusinessRegistration",
      {
        UserAccountID: {
          type: DataTypes.INTEGER,
          references: {
            // This is a reference to another model
            model: "User",
          },
        },
  
        BusinessName: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
        },
        OptionalBusinessName: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
        },

        ProprietorName :{
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
          },
          IdentificationType : {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        } ,
        IdentificationFile : {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        } ,

        CertificateFile : {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        } ,

        PassportPhotoOne : {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        } ,
        PassportPhotoTwo : {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
        } ,

        BusinessAddress: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: false,
        },
        BusinessPhone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
          },
          BusinessEmail: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
          },

          
        isVerfied :{
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        
        isSecondName :{
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        isNameDeclined : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        isAvailable : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        isSuccessful : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        
        isPaid : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
  
      },
      {
        //# Prevent table name change to plural
        freezeTableName: true,
      }
    );
    BusinessRegistration.associate = (models) => {
      {
        BusinessRegistration.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: "UserAccountID",
        });
      }
    };
  
    
    BusinessRegistration.sync().then(() => {
      console.log('Busines sRegistration Has been Synced')
    });
    return BusinessRegistration;
  };
  