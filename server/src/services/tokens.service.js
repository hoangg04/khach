const { AuthorizedError, BadRequestError } = require("../core/error.response");
const Token = require("../models/token.model");
const User = require("../models/user.model");
const { generateTokenPair } = require('../utils/generateToken');
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
class TokenService {
	static async createToken({ usr_id }) {
		const uuid = uuidv4();
		const tokens = generateTokenPair({ id: usr_id, uuid })
		const newToken = await Token.create({
			token_value: uuid,
			token_usr_id: usr_id,
		});
		return newToken ? tokens : null;
	}
	static async findToken(token_value) {
		const userDecoded = jwt.verify(token_value, process.env.REFRESH_TOKEN_SECRET);
		return await Token.findOne({ where: { token_value: userDecoded.uuid } });
	}
	static async renewToken({ userId, token_value }) {
		const userDecoded = jwt.verify(token_value, process.env.REFRESH_TOKEN_SECRET);
		if (userDecoded.id != userId) {
			throw new BadRequestError("Lỗi xác thực");
		}
		const uuid = uuidv4();
		const tokens = generateTokenPair({ id: userId, uuid })
		const newToken = await Token.update({ token_value: uuid }, {
			where: {
				token_value: userDecoded.uuid,
			}
		});
		return newToken[0] ? tokens : null
	}
	static async deleteToken({ token, userId }) {
		const userDecoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
		if (userDecoded.id != userId) {
			throw new BadRequestError("Lỗi xác thực");
		}
		return await Token.destroy({
			where: {
				token_value: userDecoded.uuid,
			}
		});
	}
}
module.exports = TokenService;