const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME_MYSQL,
	process.env.DB_USER_MYSQL,
	process.env.DB_PASSWORD_MYSQL,
	{
		host: process.env.DB_HOST_MYSQL,
		port: process.env.DB_PORT_MYSQL,
		dialect: "mysql",
		logging: true, // Optional: Set to true to see SQL queries in the console
	},
);

module.exports = sequelize;
