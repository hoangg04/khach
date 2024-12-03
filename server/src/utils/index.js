"use strict";
const _ = require("lodash");
const getInfoData = (fields = [], object = {}) => {
	return _.pick(object, fields);
};
const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			obj = { ...obj, ...object[key] };
		}
		return obj;
	}, {});
};
const validateAddress = (address) => {
	const { city, district, ward } = address;
	return province[`${city}-${district}-${ward}`] ? true : false;
}
function isValidTimestamp(timestamp) {
	const date = new Date(+timestamp);
	return date instanceof Date && !isNaN(date.getTime());
}
const isWithinNextDay = (appointmentTime) => {
	const appointmentDate = new Date(appointmentTime);
	const now = new Date();

	if (isNaN(appointmentDate.getTime())) {
		throw new Error('Thời gian không hợp lệ');
	}

	const timeDifference = appointmentDate.getTime() - now.getTime();
	const ONE_DAY_MS = 24 * 60 * 60 * 1000;

	return timeDifference > 0 && timeDifference <= ONE_DAY_MS;
};
const isValidFutureDate = (pickedTimestamp) => {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	const currentTimestamp = currentDate.getTime();

	const pickedDate = new Date(+pickedTimestamp);
	pickedDate.setHours(0, 0, 0, 0);
	const normalizedPickedTimestamp = pickedDate.getTime();

	return normalizedPickedTimestamp >= currentTimestamp;
};
const { Op } = require("sequelize");


function convertParam(queryParams) {
	const result = {};
	const errors = []
	for (const [key, value] of Object.entries(queryParams)) {
		if (typeof value === 'string') {
			// Check for operator patterns (e.g., "gt_15", "lt_200")
			const [attribute, operator] = key.split(/_(?=[^_]+$)/);
			const operand = value;
			// Map string operators to Sequelize operators
			switch (operator) {
				case 'gt':
					if (isNaN(operand)) {
						errors.push(`${attribute}: ${value} - Invalid value for operator ${operator}`);
						break;
					}
					result[attribute] = { ...result[attribute], [Op.gt]: parseFloat(operand) };
					break;
				case 'lt':
					if (isNaN(operand)) {
						errors.push(`${attribute}: ${value} - Invalid value for operator ${operator}`);
						break;
					}
					result[attribute] = { ...result[attribute], [Op.lt]: parseFloat(operand) };
					break;
				case 'gte':
					if (isNaN(operand)) {
						errors.push(`${attribute}: ${value} - Invalid value for operator ${operator}`);
						break;
					}
					result[attribute] = { ...result[attribute], [Op.gte]: parseFloat(operand) };
					break;
				case 'lte':
					if (isNaN(operand)) {
						errors.push(`${attribute}: ${operand} - Invalid value for operator ${operator}`);
						break;
					}
					result[attribute] = { ...result[attribute], [Op.lte]: parseFloat(operand) };
					break;
				case 'like':
					result[attribute] = { [Op.like]: `%${operand}%` };
					break;
				case "ne":
					if (isNaN(operand)) {
						errors.push(`${attribute}: ${value} - Invalid value for operator ${operator}`);
						break;
					}
					result[attribute] = { ...result[attribute], [Op.ne]: parseFloat(operand) };
					break;
				default:
					if (["true", "false"].includes(value)) {
						result[attribute] = value === "true" ? true : false;
						break;
					}
					result[attribute] = isNaN(value) ? value : parseFloat(value); // Default to direct value
			}
		} else {
			if (value) {
				result[attribute] = value;
			}
		}
	}

	return {
		result,
		errors
	};
}
module.exports = { getInfoData, pick, validateAddress, isValidTimestamp, isWithinNextDay, isValidFutureDate, convertParam };