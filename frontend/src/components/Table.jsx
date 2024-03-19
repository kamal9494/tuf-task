import React, { useState } from "react";
import Pagination from "./Pagination";

const Table = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : null;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 10;

  const handlePage = (num) => {
    setCurrentPage(num);
  };

  const totalPages = Math.ceil(data.length / itemsOnPage);
  return (
    <>
      <div className="p-2">
        <div className="overflow-auto rounded-lg shadow mt-3">
          <table className="w-full border text-left">
            <thead className="bg-gray-400 uppercase border-2">
              <tr className="text-sm font-semibold tracking-wide">
                {headers &&
                  headers.map((header, index) => (
                    <th className="px-6 py-3" key={index}>
                      {header === "code" ? (
                        <div>
                          {header}
                          <span className="text-xs font-small text-red-600 lowercase mx-3">
                            (Initial 100 character's)
                          </span>
                        </div>
                      ) : (
                        header
                      )}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data
                  .slice(
                    (currentPage - 1) * itemsOnPage,
                    currentPage * itemsOnPage
                  )
                  .map((row, rowIndex) => {
                    return (
                      <tr
                        key={rowIndex}
                        className="bg-white hover:bg-gray-100 border-2 text-left"
                      >
                        {Object.entries(row).map(([key, value], colIndex) => (
                          <td key={colIndex} className="px-6 py-4 text-sm">
                            {key === "code" ? (
                              <pre className="whitespace-pre-wrap text-xs">
                                {value.code}
                                {!value.fullcode && (
                                  <span className="font-bold">...</span>
                                )}
                              </pre>
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {data && data.length === 0 && (
            <div className="w-full flex items-center justify-center">
              No Submissions
            </div>
          )}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        handlePage={handlePage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Table;
