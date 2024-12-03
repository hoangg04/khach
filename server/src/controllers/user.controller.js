const { SUCCESS } = require('../core/success.response');
const UserService = require('../services/users.service');

class UserController {
	static async me(req, res) {
		return new SUCCESS({
			metadata: await UserService.me(req.user.userId),
		}).send(res);
	}
}
module.exports = UserController;