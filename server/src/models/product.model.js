// models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbs/init.mysql");

const Product = sequelize.define(
  "Product",
  {
    pro_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pro_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pro_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pro_previousPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    pro_description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
    pro_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pro_isNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pro_brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pro_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["pro_title", "pro_brand"],
      },
    ],
  }
);

module.exports = Product;
	