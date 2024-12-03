import axiosClient from "./axiosClient";
export default class CartApi {
	static addToCart(data) {
		return axiosClient.post('/cart', data);
	}
	static getCart() {
		return axiosClient.get('/cart');
	}
	static updateCart(data) {
		return axiosClient.put('/cart', data);
	}
	static deleteCart(data) {
		return axiosClient.delete('/cart', data);
	}

}