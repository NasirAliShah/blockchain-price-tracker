'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alert.init({
    chain: DataTypes.STRING,
    targetPrice: DataTypes.DECIMAL,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Alert',
  });
  return Alert;
};