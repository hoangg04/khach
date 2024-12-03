const Cart = require("../models/cart.model");
const { apiResponse } = require("../utils/response");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { getInfoData } = require("../utils");
const { convertParam } = require("../utils");
const Product = require("../models/product.model");
class CartService {
	static async addToCart({ user_id, data }) {
		const {
			product_id,
			quantity
		} = data;
		// find cart by id if it exists add product to cart else create new cart
		const cart = await Cart.findOne({
			where: {
				cart_usr_id: user_id,
				cart_product_id: product_id,
			}
		});
		if (cart) {
			cart.quantity += quantity;
			if (cart.quantity <= 0) {
				await cart.destroy();
				return apiResponse({
					code: 200,
					message: 'Cart deleted successfully',
					data: getInfoData(["cart_usr_id", "cart_product_id", "quantity"], cart)
				});
			}
			await cart.save();
			return apiResponse({
				code: 201,
				message: 'Cart updated successfully',
				data: getInfoData(["cart_usr_id", "cart_product_id", "quantity"], cart)
			});
		} else {
			const new_cart = await Cart.create({
				cart_usr_id: user_id,
				cart_product_id: product_id,
				quantity
			});
			return apiResponse({
				code: 201,
				message: 'Cart created successfully',
				data: getInfoData(["cart_usr_id", "cart_product_id", "quantity"], new_cart)
			})
		}
	}
	static async getCart(user_id) {
		const cart = await Cart.findAll(
			{
				where: { cart_usr_id: user_id },
				include: {
					model: Product,
					as: 'product',
					attributes: ['pro_title', 'pro_price', 'pro_image', 'pro_brand', 'pro_stock', 'pro_previousPrice', "pro_id"]
				}
			},
		);
		if (!cart) {
			throw new NotFoundError('Không tìm thấy giỏ hàng');
		}
		return apiResponse({
			message: 'Cart found',
			code: 200,
			data: cart
		})
	}
	static async updateCart({ user_id, data }) {
		const {
			product_id,
			quantity
		} = data;
		const cart = await Cart.findOne({
			where: {
				cart_usr_id: user_id,
				cart_product_id: product_id,
			}
		});
		if (!cart) {
			throw new NotFoundError('Cart not found');
		}
		if (quantity <= 0) {
			await cart.destroy();
			return apiResponse({
				code: 200,
				message: 'Cart deleted successfully',
				data: getInfoData(["cart_usr_id", "cart_product_id", "quantity"], cart)
			});
		}
		cart.quantity = quantity;
		await cart.save();
		return apiResponse({
			code: 201,
			message: 'Cart updated successfully',
			data: getInfoData(["cart_usr_id", "cart_product_id", "quantity"], cart)
		});
	}
	static async deleteCart({ user_id }) {
		const cart = await Cart.destroy({
			where: {
				cart_usr_id: user_id,
			}
		});
		if (!cart) {
			throw new NotFoundError('Cart not found');
		}
		return apiResponse({
			code: 200,
			message: 'Cart deleted successfully',
			data: cart
		});
	}

}
module.exports = CartService;
