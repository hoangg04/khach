import axiosClient from "./axiosClient";
export default class ProductApi {
	static getAllProducts({ limit = 10, page = 1 } = {}) {
		return axiosClient.get('/products', {
			params: {
				limit,
				page
			}
		});
	}
	static createProduct(data) {
		return axiosClient.post('/products', data);
	}
	static getProductById(product_id) {
		return axiosClient.get(`/products/${product_id}`);
	}
	static updateProduct(product_id, data) {
		return axiosClient.put(`/products/${product_id}`, data);
	}
	static deleteProduct(product_id) {
		return axiosClient.delete(`/products/${product_id}`);
	}
}

