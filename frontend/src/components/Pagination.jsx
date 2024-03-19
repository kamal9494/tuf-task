import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, handlePage }) => {
  return (
    <div className="w-full bg-[#E8E8E8] justify-between p-4 flex gap-2 flex-col sm:flex-row">
      <div className="flex w-full justify-between gap-2 flex-col sm:flex-row">
        {totalPages >= 1 && (
          <div className="text-sm flex font-medium items-center">
            Page {currentPage} of {totalPages}
          </div>
        )}
        <div className="flex justify-center items-center gap-2">
          <button
            className={`first-page text-sm rounded-md bg-white p-2 flex justify-center items-center border ${
              currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePage(1)}
          >
            First Page
          </button>
          <button
            className={`previous-page w-[30px] h-[30px] rounded-md bg-white p-2 flex justify-center items-center border ${
              currentPage - 1 < 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage - 1 < 1}
          >
            <FaAngleLeft />
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            return (
              <button
                key={index + 1}
                className={`${
                  index + 1
                } page w-[30px] h-[30px] rounded-md bg-white p-2 cursor-pointer flex justify-center items-center border ${
                  currentPage === index + 1 ? "text-red-500" : ""
                }`}
                onClick={() => handlePage(index + 1)}
              >
                {index + 1}
              </button>
            );
          })}

          <button
            className={`w-[30px] h-[30px] rounded-md bg-white p-2 flex justify-center items-center border ${
              currentPage + 1 > totalPages
                ? "next-page opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage + 1 > totalPages}
          >
            <FaAngleRight />
          </button>
          <button
            className={`last-page rounded-md bg-white p-2 flex justify-center items-center border ${
              currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePage(totalPages)}
          >
            Last Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
