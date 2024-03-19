import React, { useState } from "react";

const Selector = ({ displayName, dropdown, selectedOption, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClicked = (e, value) => {
    e.preventDefault();
    handleChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative bg-white rounded-lg">
      <button
        className={`flex justify-between min-w-[100px] items-center rounded-lg border-gray-300 shadow hover:shadow-md focus:border-gray-400 focus:shadow-md border px-4 py-2`}
        type="button"
        onClick={toggleDropdown}
      >
        <div className="flex gap-2 items-center">{selectedOption}</div>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 bg-white absolute right-0 divide-y ${
          isOpen ? "block" : "hidden"
        } rounded shadow`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropdown.map((item, index) => (
            <li key={index}>
              <button
                className="w-full text-left flex items-center min-w-[100px] gap-4 px-4 py-2 hover:bg-gray-300"
                onClick={(e) => handleOptionClicked(e, item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Selector;
