const Joi = require('joi');
const registerSchema = {
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	fullName: Joi.string().required(),
}
const loginSchema = {
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
}
module.exports = {
	registerSchema,
	loginSchema,
};