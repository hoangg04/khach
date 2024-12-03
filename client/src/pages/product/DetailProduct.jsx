import React from "react";
import PaginationComponent from "@/components/PaginationComponent";
import { ProductList } from "@/components/Product/ProductList";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductApi from "@/api/product.api";
import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus } from "@geist-ui/icons";
import Rating from "@/components/Rating";
import CartApi from "@/api/cart.api";
import { toast } from "sonner";
export const DetailProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	useEffect(() => {
		const fetchProducts = async () => {
			const res = await ProductApi.getProductById(id);
			console.log("res", res);
			if (res.status === 200) {
				setProduct(res.metadata.data);
			} else {
				navigate("/404");
			}
		};
		fetchProducts().finally(() => setLoading(false));
	}, []);
	async function addToCart(product) {
		const res = await CartApi.addToCart({
			product_id: product.pro_id,
			quantity,
		});
		if (res.status === 200) {
			navigate("/cart");
			toast.success("Thêm sản phẩm thành công");
		} else {
			toast.error("Thêm sản phẩm thất bại");
		}
	}
	
	return loading ? (
		<Loader2 className="animate-spin mx-auto col-span-3" />
	) : (
		<>
			<div>
				<div className="bg-white">
					<div className="container mx-auto flex flex-col pb-5 pt-[100px] md:flex-row md:px-5 xl:max-w-[1200px]">
						<div className="m-3 mt-6 flex items-center justify-center overflow-hidden rounded-md border border-green-active transition-all sm:px-6 md:m-0 md:mx-auto md:min-w-[400px]">
							<img src={product.pro_image} alt={product?.pro_title} />
						</div>

						<div className="mx-auto flex max-w-2xl flex-col px-4 pb-16 pt-10 sm:px-6">
							<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
								<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
									{product.pro_title[0].toUpperCase() + product.pro_title.slice(1)}
								</h1>
							</div>

							<div className="mt-4 lg:row-span-3 lg:mt-0">
								<div>
									<div className="flex items-center">
										<p className="mt-1 text-sm font-medium text-gray-300 line-through">
											${product.pro_previousPrice}
										</p>
										<p className="ml-3 mt-1 text-lg font-medium text-gray-900">${product.pro_price}</p>
									</div>
								</div>
								<div className="mt-6">
									<h3 className="sr-only">Đánh giá</h3>
									<div className="flex items-center">
										<div className="flex items-center">
											<p className="sr-only">4</p>
											<Rating
												rate={4}
												setRate={null}
												className="cursor-pointer size-5 mt-0"
											/>
										</div>

										<a
											href="#"
											className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
										>
											9889 reviews
										</a>
									</div>
								</div>
							</div>

							<div className="mt-5 pb-10">
								<div className="mb-5 flex flex-col gap-3 sm:w-[300px]">
									<div className="flex w-max items-center overflow-hidden rounded-lg border border-solid border-primary-light">
										<button
											onClick={() => quantity > 1 && setQuantity(quantity - 1)}
											className="flex size-10 items-center justify-center bg-white px-2 py-2 text-dark hover:bg-primary-light disabled:bg-gray-400 disabled:text-[#C4CDD5]"
											disabled={quantity == 1}
										>
											<Minus className="size-5"/>
										</button>
										<span className="countItems text-md z-10 inline-flex size-10 items-center justify-center border-x-[1px] border-primary-light font-semibold text-dark">
											{quantity}
										</span>
										<button
											onClick={() => setQuantity(quantity + 1)}
											className="flex size-10 items-center justify-center bg-white px-2 py-2 text-dark hover:bg-primary-light"
										>
											<Plus className="size-5"/>
										</button>
									</div>
									<div className="flex items-center gap-3">
										<button
											onClick={() => addToCart(product)}
											type="button"
											className="text-md flex flex-1 justify-center rounded-md px-5 py-1.5 font-semibold leading-6 text-white shadow-sm hover:opacity-[90%] bg-blue-400"
										>
											Thêm vào giỏ hàng
										</button>
									</div>
								</div>
								<h3 className="sr-only">Description</h3>
								<div className="space-y-6">
									<p className="text-base text-gray-900">{product.pro_description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
