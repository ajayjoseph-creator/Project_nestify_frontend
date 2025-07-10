import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: "Dashboard", icon: <FaHome />, to: "/admin/dashboard" },
    { label: "Users", icon: <FaUsers />, to: "/admin/users" },
    { label: "Products", icon: <FaBox />, to: "/admin/products" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('user')
    navigate("/login");
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-[#1f1f1f] text-white h-screen p-4 flex flex-col justify-between transition-all duration-300 ${
        hovered ? "w-64" : "w-16"
      }`}
    >
      {/* Navigation Links */}
      <div className="flex flex-col space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive ? "bg-[#333]" : "hover:bg-[#2a2a2a]"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {hovered && <span className="text-sm">{link.label}</span>}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#2a2a2a] text-red-400"
        >
          <FaSignOutAlt className="text-lg" />
          {hovered && <span className="text-sm">Logout</span>}
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Sidebar;
