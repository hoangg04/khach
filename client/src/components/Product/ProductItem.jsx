import React from "react";

export const ProductItem = ({ product }) => {
	return (
		<div className="">
			<a
				href={`/products/${product.pro_id}`}
				className="group relative p-3 overflow-hidden rounded-xl bg-gray-200 block"
			>
				<div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg">
					<img
						loading="lazy"
						src={product.pro_image}
						alt={product.pro_title}
						className="max-h-[300px] h-full w-full object-cover object-center group-hover:opacity-75"
					/>
				</div>
				<h3 className="mt-4 text-lg text-black">
					{product.pro_title[0].toUpperCase() + product.pro_title.slice(1)}
				</h3>
				<div className="flex items-center">
					<p className="mt-1 text-sm font-medium text-red-300 line-through">
						${product.pro_previousPrice}
					</p>
					<p className="ml-3 mt-1 text-md font-medium text-gray-900">${product.pro_price}</p>
				</div>
				<div className="flex items-center mt-3">
					<span className="w-[30px] h-[30px] rounded-full bg-pink-300 block"></span>
					<span className="ml-2 text-sm text-gray-700">{product.pro_brand}</span>
				</div>
			</a>
		</div>
	);
};
