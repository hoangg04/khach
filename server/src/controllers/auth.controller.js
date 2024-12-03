const AuthService = require("../services/auth.service");
const {BadRequestError} = require("../core/error.response");
const { SUCCESS, CREATED } = require("../core/success.response");

class AuthController {
	static async register(req, res) {
		const { email, password, fullName } = req.body;
		const result = await AuthService.register({ email, password, fullName });
		const { accessToken, refreshToken } = result.data.tokens;
		delete result.data.tokens;
		return new CREATED({
			metadata: {
				...result,
				data: {
					...result.data,
					accessToken,
				}
			}
		}).setCookie(res, "refreshToken", refreshToken).send(res);
	}

	static async login(req, res) {
		const { email, password } = req.body;
		const result = await AuthService.login({ email, password });
		const { accessToken, refreshToken } = result.data.tokens;
		delete result.data.tokens;
		return new SUCCESS({
			metadata: {
				...result,
				data: {
					...result.data,
					accessToken,
				}
			}
		}).setCookie(res, "refreshToken", refreshToken).send(res);
	}

	static async renew(req, res) {
		const token = req.cookies["refreshToken"];
		const { ["x-client-id"]: userId } = req.headers;
		if (!userId) {
			throw new BadRequestError("Lỗi xác thực");
		}
		const result = await AuthService.refreshToken({ userId, token_value: token });
		const { accessToken,refreshToken } = result.data;
		delete result.data;
		return new SUCCESS({
			metadata: {
				...result,
				accessToken
			}
		}).setCookie(res, "refreshToken", refreshToken).send(res);

	}

	static async logout(req, res) {
		const {userId} = req.user;
		const token = req.cookies["refreshToken"];
		const result = await AuthService.logout({token, userId});
		return new SUCCESS({ metadata: result }).send(res);
	}
}
module.exports = AuthController;