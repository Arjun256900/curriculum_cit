import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import logo from "../assets/cit_logo2.png";
import { AuthContext } from "./AuthContext";

const Header = ({}) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // Notification state
  const dropdownRef = useRef(null);
  const regulation = localStorage.getItem("regulation");
  const userObj = JSON.parse(localStorage.getItem("user")) || {};
  const [activeNav, setActiveNav] = useState("dashboard");

  const location = window.location.pathname;

  console.log("Location :", location);

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  function handleOptionSelect(selectedNav) {
    setActiveNav(selectedNav);
  }

  // Show notification when clicking "Department"
  const handleDepartmentClick = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000); // Hide after 4 seconds
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className="flex flex-row justify-between p-3 items-center text-gray-300">
        {/* Logo */}
        <div className="flex flex-row items-center">
          <img alt="logo" className="w-16 h-16 object-contain rounded-2xl" src={logo} />
          <p className="px-3 text-5xl">
            CIT<span className="text-blue-400">.AI</span>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="px-4 flex items-center space-x-6">
          <a
            href="/chart"
            onClick={() => handleOptionSelect("analysis")}
            className={`${activeNav === "analysis" ? "text-blue-500" : ""} cursor-pointer text-xl px-2 hover:text-white transition duration-300 hover:shadow-lg hover:shadow-white/10 ${location === "/select-department" ? "hidden" : "block"}`}
          >
            Analysis
          </a>
          <a
            href = "/dashboard"
            onClick={() => handleOptionSelect("dashboard")}
            className={`${activeNav === "dashboard" ? "text-blue-500" : ""} cursor-pointer text-xl px-2 hover:text-white transition duration-300 hover:shadow-lg hover:shadow-white/10 ${location === "/select-department" ? "hidden" : "block"}`}
          >
            Dashboard
          </a>

          {/* Profile Dropdown */}
          <div className="relative z-20" ref={dropdownRef}>
            <img
              src="https://imgs.search.brave.com/e00MvqlHPettu1iD8Sz-aiboC7OCbFRqtSNyMVnL2Ug/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jdXRl/ZHAub3JnL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzEwL25v/X2RwX2ltYWdlLTE5/MDEuanBn"
              alt="Profile"
              className="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-400 hover:border-white transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-48 bg-gray-950 shadow-lg rounded-lg py-2"
              >
                <a
                  href="#notifications"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
                >
                  Notifications
                </a>
                <a
                  onClick={handleDepartmentClick} // Triggers notification
                  className="block px-4 py-2 cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white transition"
                >
                  Department - {userObj.department}
                </a>
                <a
                  href="/select-department"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
                >
                  Regulation - {regulation}
                </a>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 cursor-pointer text-red-800 hover:bg-gray-700 hover:text-red-500 transition duration-300"
                >
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Pop-up */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed top-5 right-5 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <p>You have to sign out and log in again to change departments!</p>
            {/* Timeout bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3.5, ease: "linear" }}
              className="h-1 bg-red-500 mt-2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;