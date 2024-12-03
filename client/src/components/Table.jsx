import { Plus } from "@geist-ui/icons";
import React from "react";
import ButtonModalForm from "./ModalForm";
import { ModalDelete } from "./ModalDelete";

export default function Table({ products }) {
	return (
		<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
			<div className="relative my-4 overflow-hidden bg-white p-3 shadow-md sm:rounded-lg">
				<div className="overflow-x-auto">
					<div className="flex justify-end mb-2">
						<ButtonModalForm method="add"/>
					</div>
					<table className="table-data w-full text-left text-sm text-dark">
						<thead className="bg-gray-200 text-xs uppercase text-dark">
							<tr>
								<th scope="col" className="px-4 py-3">
									Tên sản phẩm
								</th>
								<th scope="col" className="px-4 py-3">
									Hãng
								</th>
								<th scope="col" className="px-4 py-3">
									Giá
								</th>
								<th scope="col" className="px-4 py-3 text-center">
									Hành động
								</th>
							</tr>
						</thead>
						<tbody>
							{!!products.length &&
								products.map((product) => (
									<tr className="hover:bg-gray-100" key={product.pro_id}>
										<th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-dark">
											{product.pro_title[0].toUpperCase() + product.pro_title.slice(1)}
										</th>
										<td className="px-4 py-3">{product.pro_brand}</td>
										<td className="px-4 py-3">${product.pro_price}</td>
										<td className="flex items-center justify-center gap-2 px-4 py-3">

											<ButtonModalForm method="edit" id={product.pro_id}/>
											<ModalDelete id={product.pro_id}/>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
