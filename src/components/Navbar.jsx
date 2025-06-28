import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserTie } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { BiChat } from "react-icons/bi"; // 🆕 Chat icon
import PremiumModal from "../components/PremiumModal";
import Logo from "../assets/Nestify_Logo_Black_Cropped.png";
import { useLocation } from "react-router-dom";
// import { io } from "socket.io-client";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const storedName = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).name
    : null;
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(
    localStorage.getItem("subscription") === "true"
  );
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const active = data?.subscription?.active || false;
        setIsSubscribed(active);
        localStorage.setItem("subscribed", active ? "true" : "false");
      } catch (err) {
        console.error("Subscription check failed:", err);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  //for chat count

//   useEffect(() => {
//   const socket = io("http://localhost:3003");

//   socket.on("newMessage", (message) => {
//     if (window.location.pathname !== "/chat") {
//       setUnreadCount((prev) => prev + 1);
//     }
//   });

//   return () => socket.disconnect();
// }, []);

const location = useLocation();

useEffect(() => {
  if (location.pathname === "/chat") {
    setUnreadCount(0); // reset badge when on chat page
  }
}, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white/30 backdrop-blur-sm shadow-md fixed top-4 left-4 right-4 z-50 px-4 py-3 md:px-8 rounded-2xl"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <HiMenuAlt3 size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-blue-700 text-sm font-semibold">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-700 text-sm font-semibold"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-700 text-sm font-semibold"
            >
              Contact Us
            </Link>

            {isLoggedIn && (
  <Link
    to="/owner/inbox"
    className="relative hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
  >
    <BiChat size={20} />
    Chat
    {unreadCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
        {unreadCount}
      </span>
    )}
  </Link>
)}


            {isLoggedIn ? (
              <div
                className="relative flex items-center gap-3"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none"
                >
                  <FaUserTie
                    size={24}
                    className="text-gray-900 hover:text-blue-600 transition duration-200"
                  />
                </button>
                <span className="text-sm font-medium text-gray-800">
                  {storedName || "User"}
                </span>
                <button
                  onClick={() => {
                    isSubscribed
                      ? navigate("/sell")
                      : setShowSubscriptionModal(true);
                  }}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg transition duration-300 shadow"
                >
                  <FiPlus size={18} /> Sell
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-12 right-0 bg-white shadow-lg border rounded-md w-40 z-50"
                    >
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-gray-400 px-4 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 flex flex-col gap-4 text-sm px-4"
            >
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-700"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-700"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-700"
              >
                Contact Us
              </Link>

              {isLoggedIn && (
                <Link
                  to="/owner/inbox"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-700"
                >
                  Chat
                </Link>
              )}

              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-blue-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                >
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 💎 Premium Modal */}
      <PremiumModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </>
  );
};

export default Navbar;
