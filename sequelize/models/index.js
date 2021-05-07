'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');//생성자 함수
const basename = path.basename(__filename);//절대경로, basename() 경로에서 앞부분 빼고 파일 이름만
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];//models의 절대경로, module이 아니여도 가져올 수 있음
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);//모델클래스를 리턴받음
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
