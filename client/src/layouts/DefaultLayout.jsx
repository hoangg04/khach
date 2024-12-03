import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
function DefaultLayout() {
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

export default DefaultLayout;
