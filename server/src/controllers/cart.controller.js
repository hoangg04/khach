const CartService = require('../services/cart.service');
const { SUCCESS, CREATED } = require('../core/success.response');

class CartController {
	static async addToCart(req, res) {
		const response = await CartService.addToCart({ user_id: req.user.userId, data: req.body });
		return new SUCCESS({
			metadata: response,
		}).send(res);
	}
	static async getCart(req, res) {
		const response = await CartService.getCart(req.user.userId);
		return new SUCCESS({
			metadata: response,
		}).send(res)
	};
	static async updateCart(req, res) {
		const response = await CartService.updateCart({ user_id: req.user.userId, data: req.body });
		return new SUCCESS({
			metadata: response,
		}).send(res);
	};
	static async deleteCart(req, res) {
		const response = await CartService.deleteCart({ user_id: req.user.userId, data: req.body });
		return new SUCCESS({
			metadata: response,
		}).send(res);
	}
}
module.exports = CartController;