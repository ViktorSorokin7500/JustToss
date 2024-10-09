"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams as unknown as string);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={isFirstPage}
        className={`px-3 py-1 border rounded-md ${
          isFirstPage ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        ‹ Previous
      </button>

      {currentPage > 2 && (
        <>
          <button
            onClick={() => changePage(1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-200"
          >
            1
          </button>
          <span className="px-3 py-1">...</span>
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          disabled={currentPage === page}
          className={`px-3 py-1 border rounded-md ${
            currentPage === page ? "bg-primary text-white" : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 1 && (
        <>
          <span className="px-3 py-1">...</span>
          <button
            onClick={() => changePage(totalPages)}
            className="px-3 py-1 border rounded-md hover:bg-gray-200"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={isLastPage}
        className={`px-3 py-1 border rounded-md ${
          isLastPage ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        Next ›
      </button>
    </div>
  );
};
