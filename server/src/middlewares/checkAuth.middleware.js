"use strict";
const { ENUM_ROLE } = require("../constant");
const { AuthorizedError, NotFoundError, BadRequestError, PermissionError } = require("../core/error.response");
const { asyncHandler } = require("../helpers/asyncHandler");

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");

const HEADER = {
	AUTHORIZATION: "authorization",
	CLIENT_ID: "x-client-id",
};


const authentication = asyncHandler(async (req, res, next) => {
	const { [HEADER.CLIENT_ID]: userId, [HEADER.AUTHORIZATION]: authorization } = req.headers;
	if (!userId || !authorization) throw new AuthorizedError("Xác thực thất bại");
	const token = authorization.split(" ")[1];
	const userDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	if (userId != userDecode.id) throw new AuthorizedError("Xác thực thất bại");
	if(!userDecode?.uuid){
		throw new AuthorizedError("Xác thực thất bại")
	}
	const tokenServer = await Token.findOne({ where: { token_value: userDecode.uuid } });
	console.log(tokenServer?.token_value, userDecode.uuid);
	if (tokenServer?.token_value != userDecode.uuid) throw new AuthorizedError("Xác thực thất bại");
	const { usr_role, usr_phone, usr_address } = await User.findOne({ where: { usr_id: userId } });
	if (!(usr_role > ENUM_ROLE.BAN)) {
		throw new NotFoundError("Tài khoản này đã bị cấm");
	}
	if (!userId || !userDecode.id) throw new BadRequestError("Yêu cầu không đúng");
	req.user = {
		userId: userDecode.id,
		role: usr_role,
		tokenTime: userDecode.timestamp,
		phone: usr_phone,
		address: usr_address
	};
	return next();
});


const checkRole = (permissions) => {
	return (req, res, next) => {
		const { role } = req.user
		if (!permissions.includes(role)) throw new PermissionError("Bạn không có quyền truy cập");
		next()
	}
}



module.exports = { authentication, checkRole };
