import axiosClient from "./axiosClient";
export default class UserApi {
	static me() {
		return axiosClient.get('user/me');
	}
}
