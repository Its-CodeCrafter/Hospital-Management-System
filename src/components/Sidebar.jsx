// react package 
import React, { useState } from "react";
// icons 
import { FaUserPlus, FaCalendarAlt, FaHome } from "react-icons/fa";
import { MdOutlinePayment, MdMessage } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
// files 
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    {
      icon: <FaHome className="w-5 h-5" />,
      text: "Overview",
      path: "/dashboard",
    },
    {
      icon: <FaCalendarAlt className="w-5 h-5" />,
      text: "Appointments",
      path: "/appointments",
    },
    {
      icon: <FaUserPlus className="w-5 h-5" />,
      text: "My Patients",
      path: "/my-patients",
    },

    {
      icon: <AiOutlineSchedule className="w-5 h-5" />,
      text: "History",
      path: "/history",
    },
    {
      icon: <MdOutlinePayment className="w-5 h-5" />,
      text: "Payments",
      path: "/payments",
    },
    {
      icon: <MdMessage className="w-5 h-5" />,
      text: "Message",
      path: "/messages",
    },
    {
      icon: <TbReportSearch className="w-5 h-5" />,
      text: "Reports",
      path: "/reports",
    },
  ];
  const handleClick = () => {
    setIsLogoutOpen(true);
  };
  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    localStorage.removeItem("auth");
    navigate("/login");
  };
  const handleCancel = () => {
    setIsLogoutOpen(false);
  };
  return (
    <div className="">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-50 text-black"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-gray-50 text-black transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="p-4 border-gray-700">
          <h1 className="md:text-start text-center text-2xl font-bold text-black">
            HealthX
          </h1>
        </div>

        {/* User Profile Section */}
        {/* <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full text-white flex items-center justify-center">
              <span className="font-semibold">A</span>
            </div>

            <Link to={"/profile"}>
              <h3 className="font-semibold text-black">Alex Doe</h3>
              <p className="text-sm text-gray-400">alex.doe@email.com</p>
            </Link>
          </div>
        </div> */}

        {/* Navigation Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-green-800 text-white"
                        : "text-black hover:bg-green-900 hover:text-white"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)} // auto close on mobile
                >
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources Section */}
        {/* <div className="absolute bottom-[1px] left-0 right-0 p-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <FiHelpCircle className="w-5 h-5 text-gray-400" />
              <h4 className="font-semibold text-black">Need help?</h4>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Check our documentation or contact support
            </p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-black py-2 px-4 rounded-lg transition-colors text-sm font-medium">
              Get Help
            </button>
          </div>
        </div> */}

        <div className="absolute bottom-px left-0 right-0 p-4 space-y-2">
          <NavLink
            to={"/settings"}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-green-800 text-white"
                  : "text-black hover:bg-green-900 hover:text-white"
              }`
            }
            onClick={() => setIsSidebarOpen(false)} // auto close on mobile
          >
            <FiSettings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </NavLink>
          <button
            onClick={handleClick}
            className="  flex w-full cursor-pointer items-center space-x-3 px-4 py-3 hover:bg-green-900 hover:text-white rounded-lg transition-colors "
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
      {isLogoutOpen && (
        <LogoutModal onCancel={handleCancel} onConfirm={handleConfirmLogout} />
      )}
    </div>
  );
};

export default Sidebar;
