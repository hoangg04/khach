import React from "react";
import PaginationComponent from "@/components/PaginationComponent";
import { ProductList } from "@/components/Product/ProductList";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductApi from "@/api/product.api";
import Table from "@/components/Table";
export default function Admin() {
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	const [filter, setFilter] = useState({
		limit: 10,
		page: 1,
	});
	useEffect(() => {
		const fetchProducts = async () => {
			const res = await ProductApi.getAllProducts();
			console.log("res", res);
			if (res.status === 200) {
				const { rows, count } = res.metadata.data;

				console.log("res", res);
				setProducts(rows);
				setTotal(count);
			}
		};
		fetchProducts().finally(() => setLoading(false));
	}, [filter.limit, filter.page]);
	if (loading)
		return (
			<>
				<Loader2 className="animate-spin"></Loader2>
			</>
		);
	return products ? <Table products={products} /> : <div>Không có sản phẩm nào</div>;
}
