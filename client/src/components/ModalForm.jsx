import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ProductApi from "@/api/product.api";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ButtonModalForm = ({ method, id = null }) => {
	const [formData, setFormData] = useState({
		pro_title: "",
		pro_price: 0,
		pro_previousPrice: 0,
		pro_description: "",
		pro_image: "",
		pro_isNew: true,
		pro_brand: "Apple",
		pro_stock: 1,
	});
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);
	useEffect(() => {
		if (method === "edit") {
			const fetchProduct = async () => {
				const res = await ProductApi.getProductById(id);
				if (res.status === 200) {
					const product = res.metadata.data;
					setFormData({
						pro_title: product.pro_title,
						pro_price: product.pro_price,
						pro_previousPrice: product.pro_previousPrice,
						pro_description: product.pro_description,
						pro_image: product.pro_image,
						pro_isNew: product.pro_isNew,
						pro_brand: product.pro_brand,
						pro_stock: product.pro_stock,
					});
					setPreviewImage(product.pro_image);
				}
			};
			fetchProduct();
		}
	}, []);
	const [previewImage, setPreviewImage] = useState(formData.pro_image);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setPreviewImage(imageUrl);
			setFile(file);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let image = formData.pro_image;
		if (file) {
			const uploadForm = new FormData();
			uploadForm.append("file", file);
			const res = await uploadImage(uploadForm);
			if (res.status === 200) {
				image = res.data.secure_url;
			}
		}
		let res_product;
		if (method === "add") {
			res_product = await ProductApi.createProduct({
				...formData,
				pro_image: image,
			});
		} else {
			res_product = await ProductApi.updateProduct(id, {
				...formData,
				pro_image: image,
			});
		}
		if (res_product.status === 200) {
			toast.success("Product updated successfully");
			window.location.reload();
		} else if (res_product.status === 201) {
			toast.success("Product created successfully");
			window.location.reload();
		} else {
			toast.error("Product update failed");
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-transparent m-0 p-0 hover:bg-transparent text-black size-fit rounded-md px-4 py-1 text-sm text-dark ring-1 ring-inset ring-blue-500 hover:bg-blue-500 hover:text-white">
					{method == "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{method == "add" ? "Thêm sản phẩm " : "Sửa sản phẩm"}</DialogTitle>
				</DialogHeader>
				<form onSubmit={async (e) => await handleSubmit(e)}>
					<div className="space-y-2">
						<Label htmlFor="name" className="text-right">
							Tên sản phẩm
						</Label>
						<Input
							name="pro_title"
							label="Tên sản phẩm"
							placeholder="Enter product title"
							value={formData.pro_title}
							onChange={handleChange}
						/>
						<Label htmlFor="pro_price" className="text-right">
							Giá
						</Label>
						<Input
							name="pro_price"
							label="Giá"
							type="number"
							placeholder="Enter product price"
							value={formData.pro_price}
							onChange={handleChange}
						/>
						<Label htmlFor="pro_previousPrice" className="text-right">
							Giá cũ
						</Label>
						<Input
							name="pro_previousPrice"
							label="Giá cũ"
							type="number"
							placeholder="Enter previous price"
							value={formData.pro_previousPrice}
							onChange={handleChange}
						/>
						<Label htmlFor="pro_description" className="text-right">
							Mô tả
						</Label>
						<Textarea
							name="pro_description"
							label="Mô tả"
							placeholder="Enter product description"
							value={formData.pro_description}
							onChange={handleChange}
						/>
						<div>
							<label className="block mb-2 font-medium">Hình ảnh</label>
							<Input type="file" accept="image/*" onChange={handleImageChange} />
							{previewImage && (
								<div className="mt-4">
									<img
										src={previewImage}
										alt="Preview"
										className="h-32 w-32 object-cover rounded-md"
									/>
								</div>
							)}
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="isNew"
								name="Hàng mới"
								checked={formData.pro_isNew}
								onChange={handleChange}
							/>
							<label htmlFor="isNew">Hàng mới</label>
						</div>
						<Input
							name="pro_brand"
							label="Hãng"
							placeholder="Enter product brand"
							value={formData.pro_brand}
							onChange={handleChange}
						/>
						<Label htmlFor="pro_stock" className="text-right">
							Số lượng
						</Label>
						<Input
							name="pro_stock"
							label="Số lượng"
							type="number"
							placeholder="Enter stock quantity"
							value={formData.pro_stock}
							onChange={handleChange}
						/>
					</div>
					<DialogFooter className="mt-4">
						<Button type="submit">Save</Button>
						<Button variant="ghost" type="button">
							Cancel
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ButtonModalForm;
