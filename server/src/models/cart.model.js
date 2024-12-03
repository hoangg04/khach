// models/Cart.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbs/init.mysql");
const User = require("./user.model");
const Product = require("./product.model");

const Cart = sequelize.define(
	"Cart",
	{
		cart_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		cart_usr_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "usr_id",
			}
		},
		cart_product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Product,
				key: "pro_id",
			}
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		freezeTableName: true,
	}
);
Cart.belongsTo(User, { as: "user", foreignKey: "cart_usr_id", onDelete: "CASCADE" });
User.hasMany(Cart, { as: "cart", foreignKey: "cart_usr_id", onDelete: "CASCADE" });
Cart.belongsTo(Product, { as: "product", foreignKey: "cart_product_id", onDelete: "CASCADE" });
Product.hasMany(Cart, { as: "cart", foreignKey: "cart_product_id", onDelete: "CASCADE" });


module.exports = Cart;
