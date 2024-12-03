import React, { useEffect, useState } from "react";
import LoadingButton from "../Button/LoadingButton";
import { Loader2 } from "lucide-react";
import { ProductItem } from "./ProductItem";
import ProductApi from "@/api/product.api";
import PaginationComponent from "../PaginationComponent";

export const ProductList = ({ products}) => {
	
	return !products ? (
		<div className="mx-auto col-span-3">Không tìm thấy sản phẩm nào</div>
	) : (
		<>
			{products.map((product) => (
				<ProductItem key={product.pro_id} product={product} />
			))}
		</>
	);
};
