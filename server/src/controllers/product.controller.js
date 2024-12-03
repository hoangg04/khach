const ProductService = require('../services/product.service');
const { SUCCESS, CREATED } = require('../core/success.response');

class ProductController {
	static async createProduct(req, res) {
		const response = await ProductService.createProduct(req.body);
		return new CREATED({
			metadata: response,
		}).send(res);
	}
	static async getProductById(req, res) {
		const response = await ProductService.getProductById(req.params.product_id);
		return new SUCCESS({
			metadata: response,
		}).send(res);
	}
	static async getAllProducts(req, res) {
		const response = await ProductService.searchProduct(req.query);
		return new SUCCESS({
			metadata: response,
		}).send(res);
	}
	static async updateProduct(req, res) {
		const response = await ProductService.updateProduct(req.params.product_id, req.body);
		return new SUCCESS({
			metadata: response,
		}).send(res);
	}
	static async deleteProduct(req, res) {
		const response = await ProductService.deleteProduct(req.params.product_id);
		return new SUCCESS({
			metadata: response,
		}).send(res);
	}
}
module.exports = ProductController;