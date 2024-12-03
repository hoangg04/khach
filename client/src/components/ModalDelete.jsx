import ProductApi from "@/api/product.api";
import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export function ModalDelete({ id }) {
	const handleSubmit = async () => {
		const res = await ProductApi.deleteProduct(id);
		if (res.status === 200) {
			toast.success("Xóa sản phẩm thành công", {
				duration: 1000,
			});
			window.location.reload();
		} else {
			toast.error("Xóa sản phẩm thất bại", {
				duration: 1000,
			});
		}
	};
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className={"bg-transparent m-0 p-0 hover:bg-transparent text-black size-fit rounded-md px-4 py-1 text-sm text-dark ring-1 ring-inset ring-red-500 hover:bg-red-500 hover:text-white"}>Xóa</Button>
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-[425px] flex flex-col rounded-md"
				aria-describedby={undefined}
			>
				<DialogHeader className="mb-4">
					<DialogTitle>
						Bạn có muốn xóa không?
					</DialogTitle>
				</DialogHeader>

				<DialogFooter>
					<div className="flex gap-2 justify-end">
						<Button
							onClick={async () => {
								await handleSubmit();
							}}
							className="bg-blue-400 hover:bg-blue-300"
						>
							Xác nhận
						</Button>
						<Button className="bg-red-500" onClick={() => setOpen(false)}>
							Hủy
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
