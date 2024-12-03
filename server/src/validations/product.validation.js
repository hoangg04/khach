// validations/productValidation.js
const Joi = require("joi");

const createProductSchema = {
	pro_title: Joi.string().min(3).required().messages({
		"string.empty": "Product title is required.",
		"string.min": "Product title must be at least 3 characters long.",
	}),
	pro_price: Joi.number().positive().precision(2).required().messages({
		"number.base": "Price must be a valid number.",
		"number.positive": "Price must be a positive number.",
		"number.precision": "Price can have up to 2 decimal places.",
		"any.required": "Price is required.",
	}),
	pro_previousPrice: Joi.number().positive().precision(2).allow(null).messages({
		"number.base": "Previous price must be a valid number.",
		"number.positive": "Previous price must be a positive number.",
		"number.precision": "Previous price can have up to 2 decimal places.",
	}),
	pro_description: Joi.string().allow("").max(1000).messages({
		"string.max": "Description cannot exceed 1000 characters.",
	}),
	pro_image: Joi.string().uri().allow(null).messages({
		"string.uri": "Image must be a valid URL.",
	}),
	pro_isNew: Joi.boolean().messages({
		"boolean.base": "IsNew must be a boolean value.",
	}),
	pro_brand: Joi.string().min(2).required().messages({
		"string.empty": "Brand is required.",
		"string.min": "Brand must be at least 2 characters long.",
	}),
	pro_stock: Joi.number().integer().min(1).required().messages({
		"number.base": "Quantity must be a valid number.",
		"number.integer": "Quantity must be an integer.",
		"number.min": "Quantity must be at least 1.",
		"any.required": "Quantity is required.",
	}),
}

const updateProductSchema = {
	pro_title: Joi.string().min(3).messages({
		"string.empty": "Product title is required.",
		"string.min": "Product title must be at least 3 characters long.",
	}),
	pro_price: Joi.number().positive().precision(2).messages({
		"number.base": "Price must be a valid number.",
		"number.positive": "Price must be a positive number.",
		"number.precision": "Price can have up to 2 decimal places.",
	}),
	pro_previousPrice: Joi.number().positive().precision(2).allow(null).messages({
		"number.base": "Previous price must be a valid number.",
		"number.positive": "Previous price must be a positive number.",
		"number.precision": "Previous price can have up to 2 decimal places.",
	}),
	pro_description: Joi.string().allow("").max(1000).messages({
		"string.max": "Description cannot exceed 1000 characters.",
	}),
	pro_image: Joi.string().uri().allow(null).messages({
		"string.uri": "Image must be a valid URL.",
	}),
	pro_isNew: Joi.boolean().messages({
		"boolean.base": "IsNew must be a boolean value.",
	}),
	pro_brand: Joi.string().min(2).messages({
		"string.empty": "Brand is required.",
		"string.min": "Brand must be at least 2 characters long.",
	}),
	pro_stock: Joi.number().integer().min(1).messages({
		"number.base": "Quantity must be a valid number.",
		"number.integer": "Quantity must be an integer.",
		"number.min": "Quantity must be at least 1.",
	}),
}

module.exports = {
	createProductSchema,
	updateProductSchema,
};
