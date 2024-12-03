import React from "react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import CartApi from "@/api/cart.api";
import { NavLink, useNavigate } from "react-router-dom";
import { Minus, Plus } from "@geist-ui/icons";
import { toast } from "sonner";
export const Cart = () => {
	const [cart, setCart] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate()
	useEffect(() => {
		const fetchCart = async () => {
			const res = await CartApi.getCart();
			console.log("res", res);
			if (res.status === 200) {
				setCart(res.metadata.data);
			}
		};
		fetchCart().finally(() => setLoading(false));
	}, []);
	const handleRemoveItem = async (id) => {
		const res = await CartApi.updateCart({
			product_id: id,
			quantity: 0,
		});
		if (res.status === 200) {
			setCart(cart.filter((item) => item.cart_product_id !== id));
		}
	};
	const incrementItem = async (id) => {
		const res = await CartApi.addToCart({
			product_id: id,
			quantity: 1,
		});
		if (res.status === 200) {
			setCart(
				cart.map((item) => {
					if (item.cart_product_id === id) {
						return {
							...item,
							quantity: item.quantity + 1,
						};
					}
					return item;
				}),
			);
		}
	};
	const decrementItem = async (id, quantity) => {
		const res = await CartApi.addToCart({
			product_id: id,
			quantity: -1,
		});
		if (res.status === 200) {
			if (quantity - 1 <= 0) {
				setCart(cart.filter((item) => item.cart_product_id !== id));
			} else {
				setCart(
					cart.map((item) => {
						if (item.cart_product_id === id) {
							return {
								...item,
								quantity: item.quantity - 1,
							};
						}
						return item;
					}),
				);
			}
		}
	};
	async function pay(){
		const res = await CartApi.deleteCart();
		if (res.status === 200) {
			toast.success("Thanh toán thành công");
			navigate("/checkout")
		} else {
			toast.error("Thanh toán thất bại");
		}
	}
	return (
		<div>
			<div className="container mx-auto h-full px-4 mt-[60px]">
				<h1 className="mb-4 text-2xl font-semibold">Shopping Cart</h1>
				<div className="flex h-full flex-col gap-4 lg:flex-row">
					<div className="overflow-x-hidden overflow-y-scroll p-3 lg:w-3/4 min-h-50">
						{loading ? (
							<Loader2 className="animate-spin mx-auto col-span-3" />
						) : (
							<>
								{cart ? (
									cart.map((item, index) => (
										<div className="mb-4 bg-white p-6" key={index}>
											<div className="flex py-6">
												<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
													<img
														loading="lazy"
														src={item.product.pro_image}
														alt={item.product.pro_title}
														className="h-full w-full object-cover object-center"
													/>
												</div>
												<div className="ml-4 flex flex-1 flex-col">
													<div>
														<div className="flex justify-between text-base font-medium text-gray-900">
															<h3>
																<NavLink to={`/products/${item.product.pro_id}`}>
																	{item.product.pro_title[0].toUpperCase() +
																		item.product.pro_title.slice(1)}
																</NavLink>
															</h3>
															<p className="ml-4">${item.product.pro_price}</p>
														</div>
														<p className="mt-1 text-sm text-gray-500">{item.product.pro_brand}</p>
													</div>
													<div className="flex flex-row justify-end gap-3 my-2 items-center">
														<div className="isolate inline-flex  gap-2 -space-x-px rounded-md">
															<button
																className="relative flex h-[30px] w-[30px] items-center justify-center rounded-l-md px-2 py-2 text-dark border-[2px] border-indigo-600 checkout decrement_item"
																onClick={() => decrementItem(item.product.pro_id, item.quantity)}
															>
																<Minus className="size-5" />
															</button>
															<span className="text-md relative z-10 inline-flex h-[30px] w-[30px] items-center justify-center rounded-md border-[2px] border-indigo-600 font-semibold text-dark">
																{item.quantity}
															</span>
															<button
																className="hover:bg-primary-light bg-white border-indigo-600 border-[2px] relative flex h-[30px] w-[30px] items-center justify-center rounded-r-md px-2 py-2 text-dark"
																onClick={() => incrementItem(item.product.pro_id)}
															>
																<Plus className="size-5" />
															</button>
														</div>
													</div>
													<div className="flex flex-1 items-end justify-between text-sm">
														<div className="flex">
															<button
																type="button"
																className="font-medium text-indigo-600 hover:text-indigo-500 checkout btn__remove--item"
																onClick={() => handleRemoveItem(item.product.pro_id)}
															>
																Remove
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									))
								) : (
									<div className="text-center">Giỏ hàng trống</div>
								)}
							</>
						)}
					</div>
					<div className="lg:w-1/4">
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 text-lg font-semibold">Summary</h2>
							<div className="mb-2 flex justify-between">
								<span>Subtotal</span>
								<span className="subtotal_price"></span>
							</div>
							<div className="mb-2 flex justify-between">
								<span>Taxes</span>
								<span>$2.00</span>
							</div>
							<div className="mb-2 flex justify-between">
								<span>Shipping</span>
								<span>$30.00</span>
							</div>
							<div>
								<label htmlFor="promo" className="text-sm font-medium">
									Discount
								</label>
								<input
									type="text"
									name="promo"
									id="promo"
									className="w-full rounded-lg border border-gray-200 p-2 mt-1"
								/>
								<hr className="my-2" />
								<div className="mb-2 flex justify-between">
									<span className="font-semibold">Total</span>
									<span className="font-semibold">
										{cart?.reduce(
											(a, b) => {
												return a + parseFloat(b.product.pro_price) * b.quantity;
											},
											cart?.length ? 32 : 0,
										)}
									</span>
								</div>
								<button onClick={pay} className="mt-4 w-full rounded-lg bg-blue-400	 hover:opacity-90 px-4 py-2 text-white">
									Thanh toán
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
