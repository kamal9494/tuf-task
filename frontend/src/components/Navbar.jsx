import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const navItemClicked = ({ isActive }) => {
    return {
      color: isActive ? "red" : "white",
    };
  };

  return (
    <div className="top-0 sticky w-full bg-[#0A0A0A] z-50">
      <nav className="h-[60px] p-5 md:px-20 w-full flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-white hover:text-red-600">TUF-Code</NavLink>

        <ul className="hidden md:flex font-medium gap-10 items-center">
          <NavLink style={navItemClicked} to="/">
            Home
          </NavLink>
          <NavLink style={navItemClicked} to="/submissions">
            View Submissions
          </NavLink>
        </ul>
        <div className="flex gap-5 text-white md:hidden">
          {menu ? (
            <RxCross1
              className="cursor-pointer"
              onClick={() => setMenu((prev) => !prev)}
              size={25}
            />
          ) : (
            <AiOutlineMenu
              className="cursor-pointer"
              onClick={() => setMenu((prev) => !prev)}
              size={25}
            />
          )}
        </div>
      </nav>
      <div
        className={`h-screen menu absolute bg-[#0A0A0A] w-full transition-all duration-200 ease-in-out ${
          menu ? "" : "mt-[-500%]"
        }`}
      >
        <ul className="flex flex-col mt-10 font-medium gap-10 items-center">
          <NavLink style={navItemClicked} onClick={() => setMenu(false)} to="/">
            Home
          </NavLink>
          <NavLink style={navItemClicked} onClick={() => setMenu(false)} to="/submissions">
            View Submissions
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
