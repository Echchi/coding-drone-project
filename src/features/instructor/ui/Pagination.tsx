import React from "react";
import { cls } from "../../../shared/utils/cls";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }: IPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4 w-ful">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={cls(
          "px-4 py-2 rounded-lg font-semibold",
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        )}
      >
        이전
      </button>
      <span className="font-semibold">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={cls(
          "px-4 py-2 rounded-lg font-semibold",
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        )}
      >
        다음
      </button>
    </div>
  );
};
