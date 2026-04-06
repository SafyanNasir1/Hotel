import React from "react";
import { Link, useNavigate } from "react-router-dom";

import icon from "/dashboardIcon.svg";
import icon1 from "/addIcon.svg";
import icon2 from "/listIcon.svg";
import icon3 from "/homeicon.svg";

const OwnerLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR (COMMON) */}
      <aside className="w-20 md:w-64 bg-white border-r flex flex-col">
        <div className="p-5 border-b flex items-center gap-2 ">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
          >
            <img src={icon3} className="h-6 w-6" />
            <span className="hidden md:block">Home</span>
          </Link>
        
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
          >
            <img src={icon} className="h-6 w-6" />
            <span className="hidden md:block">Dashboard</span>
          </Link>

          <Link
            to="/addRoom"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
          >
            <img src={icon1} className="h-6 w-6" />
            <span className="hidden md:block">Add Room</span>
          </Link>

          <Link
            to="/listRooms"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
          >
            <img src={icon2} className="h-6 w-6" />
            <span className="hidden md:block">List</span>
          </Link>
        </nav>

        <div className="p-3 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT SLOT */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
};

export default OwnerLayout;
