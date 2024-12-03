'use strict';
const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const { BadRequestError, AuthorizedError } = require('../core/error.response');
const { getInfoData } = require('../utils');

const { apiResponse } = require('../utils/response');
const TokenService = require('./tokens.service');
const { generateTokenPair } = require('../utils/generateToken');
class AuthService {
	static async register({ email, password, fullName }) {
		if (!email || !password || !fullName) {
			throw new BadRequestError("Thiếu một số trường quan trọng");
		}
		const user = await User.findOne({ where: { usr_email: email } });
		if (user) {
			throw new BadRequestError("Tài khoản đã được đăng ký");
		}

		const newUser = await User.create({
			usr_email: email,
			usr_password: bcrypt.hashSync(password, 10),
			usr_name: fullName,
		});
		const tokens = await TokenService.createToken({
			usr_id: newUser.usr_id,
			usr_role: newUser.usr_role,
		});
		if (!tokens) {
			throw new BadRequestError("Có lỗi xảy ra");
		}
		return apiResponse({
			code: 200,
			message: "Register successfully",
			data: {
				user: getInfoData([
					"usr_name",
					"usr_email",
					"usr_phone",
					"usr_address",
					"usr_avatar",
					"usr_role",
					"usr_id",
				], newUser), tokens
			},
		});
	}
	static async login({ email, password }) {
		if (!email || !password) {
			throw new BadRequestError("Thiếu một số trường quan trọng");
		}
		const user = await User.findOne({ where: { usr_email: email } });
		if (!user || !bcrypt.compareSync(password, user.usr_password)) {
			throw new AuthorizedError("Tài khoản hoặc mật khẩu không chính xác");
		}
		const tokens = await TokenService.createToken({
			usr_id: user.usr_id,
			usr_role: user.usr_role,
		});
		if (!tokens) {
			throw new BadRequestError("Có lỗi xảy ra");
		}
		return apiResponse({
			code: 200,
			message: "Login successfully",
			data: {
				user: getInfoData([
					"usr_name",
					"usr_email",
					"usr_phone",
					"usr_address",
					"usr_avatar",
					"usr_role",
					"usr_id",
				], user), tokens
			},
		});
	}

	static async logout({ token ,userId}) {

		const result = await TokenService.deleteToken({
			userId,
			token
		})
		if (!result) {
			throw new BadRequestError("Có lỗi xảy ra");
		}

		return apiResponse({
			code: 200,
			message: "Logout successfully",
			data: result,
		});
	}
	static async refreshToken({ userId, token_value }) {
		const tokens = await TokenService.renewToken({
			userId,
			token_value,
		});
		if(!tokens){
			throw new BadRequestError("Có lỗi xảy ra");
		}
		return apiResponse({
			code: 200,
			message: "Refresh token successfully",
			data: tokens,
		});
	}

}

module.exports = AuthService;
