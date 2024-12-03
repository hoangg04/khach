import React from "react";

const EmptyListPage = () => {
	return (
		<div className="flex items-center justify-center">
			<div className="text-center p-6">
				<h1 className="text-2xl font-semibold text-gray-700">No Items Found</h1>
				<p className="mt-2 text-gray-500">It looks like you don’t have any items in your list.</p>
			</div>
		</div>
	);
};

export default EmptyListPage;
