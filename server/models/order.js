'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
      Order.belongsTo(models.Product);
    }
  };
  Order.init({
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    checkout_date: DataTypes.DATE,
    status: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};