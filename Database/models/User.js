module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        Username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        FullName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        isVerfied :{
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        isAffliate : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        isSuperAdmin : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        isPartner :{
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
 


    }, {
        //# Prevent table name change to plural
        freezeTableName: true,
});
    User.associate  = models =>{
        {
        User.hasOne(models.Profile,{
            onDelete: 'CASCADE' ,
            foreignKey: 'UserAccountID'
        })
 
        User.hasOne(models.UserMembership,{
            onDelete: 'CASCADE' ,
            foreignKey: 'UserAccountMembershipID'
        })
        
        User.hasMany(models.ProductItem,{
            onDelete: 'CASCADE' ,
            foreignKey: 'ProductForUserID' 
        })
                
        // User.hasMany(models.BusinessRegistration,{
        //     onDelete: 'CASCADE' ,
        //     foreignKey: 'UserAccountID' 
        // })
    }}
    User.sync().then(()=>{
        console.log('User Has been Synced')
    })
    return User;
};