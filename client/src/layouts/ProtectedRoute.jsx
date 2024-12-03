import { Navigate, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { checkLogin } from "@/utils";
function ProtectedRoute() {
	const user = useSelector((state) => state.user);
	console.log("user", user,checkLogin(user));
	if (!checkLogin(user)) {
		localStorage.removeItem("accessToken");
		return <Navigate to="/auth/login" />;
	}
	
	return (
		<>
			<Header />
			<main className="mt-20 p-4">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default ProtectedRoute;
