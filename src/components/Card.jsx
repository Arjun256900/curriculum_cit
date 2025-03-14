import React, { useState } from "react";
import "./Card.css";
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";

function Card({ selectedOption, onOptionChange }) {
  const [regulation, setRegulation] = useState(selectedOption || ""); // Initialize with prop if available
  const navigate = useNavigate();
  const userObj = JSON.parse(localStorage.getItem("user")) || {}; // ✅ FIXED: Parse JSON safely

  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setRegulation(selected);
    onOptionChange(selected);
  };

  const handleContinue = () => {
    localStorage.setItem("regulation", regulation);
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <div className="card-container">
        <div className="card">
          <h2 className="card-title">
            {userObj?.department || "No Department"}
          </h2>
          {/* ✅ Fix: Prevent errors if department is missing */}
          <p className="card-description">Please select the Regulation</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="regulation"
                value="R21"
                checked={regulation === "R21"} // ✅ Fix: Use `regulation`
                onChange={handleOptionChange}
              />
              <span>Regulation 2021</span>
            </label>
            <label>
              <input
                type="radio"
                name="regulation"
                value="R22"
                checked={regulation === "R22"}
                onChange={handleOptionChange}
              />
              <span>Regulation 2022</span>
            </label>
            <label>
              <input
                type="radio"
                name="regulation"
                value="R22R"
                checked={regulation === "R22R"}
                onChange={handleOptionChange}
              />
              <span>Regulation 2022 Revised</span>
            </label>
            <label>
              <input
                type="radio"
                name="regulation"
                value="R24"
                checked={regulation === "R24"}
                onChange={handleOptionChange}
              />
              <span>Regulation 2024</span>
            </label>
          </div>

          {regulation && (
            <div className="selected-option-container">
              <h3 className="selected-option-text">
                Selected Option: {regulation}
              </h3>
              <div className="continue-button">
                <button onClick={handleContinue}>Continue</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
