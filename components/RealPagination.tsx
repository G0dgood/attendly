import Image from "next/image";


interface PaginationProps {
	pagination: {
		total: number; // total number of items
		currentPage: number; // current active page
		pages: number; // total number of pages
		totalPages: number; // total number of pages
	};
	handlePagination: (page: string | number) => void;
}

function RealPagination({ pagination, handlePagination }: PaginationProps) {
	const { total, currentPage, pages, totalPages } = pagination;


	// Generate page numbers based on pages, not total
	const pageNumbers = [];
	for (let i = 1; i <= pagination?.pages; i++) {
		pageNumbers.push(i);
	}

	let visiblePageNumbers: number[] = [];

	// Logic for visible page numbers
	if (pages <= 5) {
		visiblePageNumbers = pageNumbers;
	} else if (currentPage <= 3) {
		visiblePageNumbers = pageNumbers.slice(0, 5);
	} else if (currentPage >= pages - 2) {
		visiblePageNumbers = pageNumbers.slice(-5);
	} else {
		visiblePageNumbers = pageNumbers.slice(currentPage - 3, currentPage + 2);
	}

	return (
		<div className="flex items-center justify-between mt-6 gap-4 w-full">
			{/* Previous Button */}
			<button
				onClick={() => handlePagination("prev")}
				disabled={currentPage === 1}
				className={`cursor-pointer flex items-center py-2 gap-2 px-5 border font-medium text-sm rounded-md text-[#3A4050] bg-white border-[#E5E7EB] ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
					}`}
			>
				<Image src={require("../public/icon/arrow-left.svg")} alt="Prev" />
				Previous
			</button>

			{/* Page Numbers */}
			<div className="flex flex-row items-center gap-2">
				{/* First Page + Ellipsis */}
				{currentPage > 3 && pages > 5 && (
					<>
						<button
							className={`cursor-pointer w-8 h-8 rounded-md flex justify-center items-center border font-medium text-sm ${currentPage === 1
								? "bg-[#2563EB] text-[#2563EB] border-[#2563EB]"
								: "bg-[#F9FAFB] text-[#050711] border-[#E5E7EB]"
								}`}
							onClick={() => handlePagination(1)}
						>
							1
						</button>
						<span className="px-1 text-gray-400">...</span>
					</>
				)}

				{/* Visible Page Buttons */}
				{visiblePageNumbers.map((pageNumber) => (
					<button
						key={pageNumber}
						onClick={() => handlePagination(pageNumber)}
						className={`cursor-pointer w-8 h-8 rounded-md flex justify-center items-center border font-medium text-sm transition ${currentPage === pageNumber
							? "bg-[#2563EB] text-[#2563EB] border-[#2563EB]"
							: "bg-[#F9FAFB] text-[#050711] border-[#E5E7EB] hover:bg-gray-100"
							}`}
					>
						{pageNumber}
					</button>
				))}

				{/* Last Page + Ellipsis */}
				{currentPage < pages - 2 && pages > 5 && (
					<>
						<span className="px-1 text-gray-400">...</span>
						<button
							className={`cursor-pointer w-8 h-8 rounded-md flex justify-center items-center border font-medium text-sm ${currentPage === pages
								? "bg-[#2563EB] text-[#2563EB] border-[#2563EB]"
								: "bg-[#F9FAFB] text-[#050711] border-[#E5E7EB]"
								}`}
							onClick={() => handlePagination(pages)}
						>
							{pages}
						</button>
					</>
				)}
			</div>

			{/* Next Button */}
			<button
				onClick={() => handlePagination("next")}
				disabled={currentPage === pages}
				className={`cursor-pointer flex items-center py-2 gap-2 px-5 border font-medium text-sm rounded-md text-[#3A4050] bg-white border-[#E5E7EB] ${currentPage === pages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
					}`}
			>
				Next
				<Image src="/icon/arrow-right.svg" alt="Next" width={24} height={24} />
			</button>
		</div>
	);
}

export default RealPagination;