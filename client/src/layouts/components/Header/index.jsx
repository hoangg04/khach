import { memo } from "react";
import Navigate from "./Navigate";
// import SearchInput from "./SearchInput";
import { NavLink } from "react-router-dom";
import { ShoppingBag } from '@geist-ui/icons'
import { useSelector } from "react-redux";


export default function Header() {
	const user = useSelector((state) => state.user);
	return (
		<header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
			<div className="mx-auto px-4 flex items-center justify-between max-w-screen-xl xl:m-auto h-14">
				<div className="flex items-center">
					<a href="/" className={`sm:text-xl text-base`}>
						Shop
					</a>
				</div>
				{/* <SearchInput /> */}
				<div className="flex gap-4">
					<div className="flex items-center relative">
						<NavLink to="/cart" className="flex items-center">
							<ShoppingBag />
							<span className="absolute top-0 -right-2 rounded-full bg-red-500 size-4 text-[10px] text-center text-white">{user.cart_count}</span>
						</NavLink>
					</div>
					<Navigate />
				</div>
			</div>
		</header>
	);
}
