'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.hasMany(models.Oshi)
    }
  }
  Member.init({
    fullName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    totalShow: DataTypes.INTEGER,
    Generasi: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    bloodType: DataTypes.STRING,
    horoscope: DataTypes.STRING,
    height: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};