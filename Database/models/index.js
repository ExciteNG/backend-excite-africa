'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
var sequelizeNoUpdateAttributes = require('sequelize-noupdate-attributes');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelizeNoUpdateAttributes(sequelize)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  sequelizeNoUpdateAttributes(sequelize)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = require('./User')(sequelize,Sequelize);
db.Affiliate = require('./Affiliate')(sequelize,Sequelize);

db.Affiliate.hasMany(db.User, {foreignKey: "AffiliateRefcode",
 as: "Users" });
 
db.User.belongsTo(db.Affiliate, {
  foreignKey: "AffiliateRefcode",
  as: "Affiliate",
});

db.Banner=require('./banner')(sequelize,Sequelize);
db.Banner=require('./banner')(sequelize,Sequelize);

db.User.hasMany(db.Banner,{as:"Banner",foreignKey:"BannerId"});
db.Banner.belongsTo(db.User,{
  foreignKey:"BannerId",
  as:"User"
})

module.exports = db;
