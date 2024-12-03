import PaginationComponent from "@/components/PaginationComponent";
import { ProductList } from "@/components/Product/ProductList";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductApi from "@/api/product.api";
export default function Home() {
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
	

	return loading ? (
		<>
			<Loader2 className="animate-spin mx-auto col-span-3" />
		</>
	) : (
		<>
			<div className="mx-auto max-w-2xl px-4 lg:max-w-7xl">
				<div className="title">Customers also purchased</div>
				<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					<ProductList products={products} />
				</div>
				<PaginationComponent total={total} filter={filter} setFilter={setFilter} />
			</div>
		</>
	);
}
