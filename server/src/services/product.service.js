const Product = require("../models/product.model");
const { apiResponse } = require("../utils/response");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { getInfoData } = require("../utils");
const { convertParam } = require("../utils");
class ProductService {
	static async createProduct(data) {
		const {
			pro_title,
			pro_price,
			pro_previousPrice,
			pro_description,
			pro_image,
			pro_isNew,
			pro_brand,
			pro_stock
		} = data;

		const new_product = await Product.create({
			pro_title,
			pro_price,
			pro_previousPrice,
			pro_description,
			pro_image,
			pro_isNew,
			pro_brand,
			pro_stock
		})
		return apiResponse({
			code: 201,
			message: 'Product request created successfully',
			data: getInfoData(["pro_title", "pro_price", "pro_previousPrice", "pro_description", "pro_image", "pro_isNew", "pro_brand", "pro_quantity"], new_product)
		});
	}
	static async getProductById(product_id) {
		const product = await Product.findByPk(product_id);
		if (!product) {
			throw new NotFoundError('Product not found');
		}
		return apiResponse({
			message: 'Product found',
			code: 200,
			data: product
		})
	}

	static async searchProduct({
		page = 1,
		limit = 10,
		orderBy = 'pro_id',
		orderType = 'asc',
	}) {
		page = Math.max(1, parseInt(page, 10) || 1);
		limit = Math.max(1, parseInt(limit, 10) || 10);
		const offset = (page - 1) * limit;

		const products = await Product.findAndCountAll({
			order: [["createdAt", "DESC"], [orderBy, orderType]],
			offset,
			limit,
		});

		return apiResponse({
			message: 'Products found',
			data: products,
			code: 200,
		});
	}

	static async updateProduct(product_id, data) {
		const product = await Product.findByPk(product_id);
		if (!product) {
			throw new BadRequestError('Không tìm thấy bình luận nào');
		}
		const updatedProduct = await Product.update(data, {
			where: {
				pro_id: product_id
			}
		});

		return apiResponse({
			message: 'Product updated successfully',
			data: updatedProduct[0] ? 'Product updated successfully' : 'Product not updated',
		});

	}
	static async deleteProduct(product_id) {
		const product = await Product.findByPk(product_id);
		if (!product) {
			throw new NotFoundError('Không tìm thấy sản phẩm nào');
		}
		const result = await product.destroy();
		return apiResponse({
			message: 'Product deleted successfully',
			code: 200,
			data: result
		});
	}

}
module.exports = ProductService;
