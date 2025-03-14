import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/cit_logo2.png";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const userObj = JSON.parse(localStorage.getItem("user")) || {};
  const regulation = localStorage.getItem("regulation");

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="header">
      <div className="header-buttons">
        <Link to="/select-department" className="credits-button">
          <button id="credits-button">Regulations</button>
        </Link>
        <button id="credits-button" onClick={navigateToDashboard}>
          DashBoard
        </button>
      </div>
      <div className="text-lg text-white">
        <p>Regulation: {regulation}</p>
      </div>
      <div id="logo-container" className="text-3xl">
        <img src={logo} alt="CIT.AI Logo" id="logo" />
        CIT.AI
      </div>
      <div className="text-lg text-white">
        <p>
          {userObj.department == "DEAN" ? "User : " : "Department of "}{" "}
          {userObj.department}
        </p>
      </div>
      <div className="header-buttons">
        <Link to="/chart" className="credits-button">
          <button id="credits-button">Go to Analysis</button>
        </Link>
        <button id="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
