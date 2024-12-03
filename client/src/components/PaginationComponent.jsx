import React from "react";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
export default function PaginationComponent({ total, filter, setFilter }) {
	return (
		<div className="mt-5">
			<Pagination>
				<PaginationContent>
					{/* Previous Button */}
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (filter.page > 1) {
									setFilter({ ...filter, page: filter.page - 1 });
								}
							}}
							className={filter.page === 1 ? "cursor-not-allowed opacity-70" : ""}
							disabled={filter.page === 1}
						/>
					</PaginationItem>

					{/* Page Numbers */}
					{Array.from({ length: Math.ceil(total / filter.limit) }).map((_, index) => (
						<PaginationItem key={index}>
							<PaginationLink
								href="#"
								onClick={(e) => {
									e.preventDefault();
									setFilter({ ...filter, page: index + 1 });
								}}
								className={index + 1 === filter.page ? "border-blue-500" : "border-gray-400"}
								isActive={index + 1 === filter.page}
							>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					{/* Next Button */}
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={(e) => {
								e.preventDefault();
								if (filter.page < Math.ceil(total / filter.limit)) {
									setFilter({ ...filter, page: filter.page + 1 });
								}
							}}
							className={
								filter.page >= Math.ceil(total / filter.limit)
									? "cursor-not-allowed opacity-70"
									: ""
							}
							disabled={filter.page >= Math.ceil(total / filter.limit)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
