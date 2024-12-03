const User = require('../models/user.model');
const { apiResponse } = require('../utils/response');
const { BadRequestError } = require('../core/error.response');
const { getInfoData, convertParam } = require('../utils');
const { ENUM_ROLE } = require('../constant');

class UserService {
	static async me(userId) {
		return apiResponse({
			code: 200,
			message: "Get me successfully",
			data: getInfoData(["usr_id", "usr_avatar", "usr_name", "usr_role", "usr_phone", "usr_address", "usr_email"], await User.findByPk(userId))
		});
	}
}
module.exports = UserService;