import { Route, Outlet, Routes } from "react-router-dom";
// Auth Components
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import NotFound from "./pages/_notFound";
import { Toaster } from "sonner";

//Layout Components
import DefaultLayout from "./layouts/DefaultLayout";

// Home Components
import Home from "./pages/home";
import UserApi from "./api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { login, updateCart } from "./lib/features/user/userSlice";
import { useEffect, useState } from "react";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { checkLogin } from "./utils";
import Me from "./pages/user/Me";
import { DetailProduct } from "./pages/product/DetailProduct";
import CartApi from "./api/cart.api";
import { Cart } from "./pages/cart";
import Admin from "./pages/admin";
import { ENUM_ROLE } from "./constant";
import Checkout from "./pages/checkout";

export default function App() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const fetchUser = async () => {
			const response = await UserApi.me();
			if (response.status === 200) {
				dispatch(login(response.metadata.data));
			}
		};
		const fetchCart = async () => {
			const response = await CartApi.getCart();
			dispatch(updateCart({ cart_count: response?.metadata?.data?.length || 0}));
		};

		if (!checkLogin(user) && token) {
			Promise.all([fetchUser(), fetchCart()]).finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [dispatch]);
	if (loading)
		return (
			<>
				<div>Loading...</div>
			</>
		);
	return (
		<>
			<Toaster richColors closeButton position="top-right" />
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					<Route index element={<Home />} errorElement={<Error />} />
					<Route path="products/:id" element={<DetailProduct />}></Route>
					<Route path="cart" element={<Cart />} errorElement={<Error />} />
					<Route path="checkout" element={<Checkout />} errorElement={<Error />} />
				</Route>

				<Route path="/auth" element={<Outlet />}>
					<Route path="login" element={<Login />} errorElement={<Error />} />
					<Route path="register" element={<Register />} errorElement={<Error />} />
					<Route path="forgot-password" element={<Forgot />} errorElement={<Error />} />
				</Route>
				<Route path="user" element={<ProtectedRoute />}>
					<Route path="me" element={<Me />} errorElement={<Error />} />
				</Route>
				{ENUM_ROLE.ADMIN === user.usr_role && (
					<Route path="admin" element={<ProtectedRoute />}>
						<Route path="dashboard" element={<Admin />} errorElement={<Error />} />
					</Route>
				)}

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
