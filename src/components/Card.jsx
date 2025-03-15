import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({ selectedOption, onOptionChange }) {
  const [regulation, setRegulation] = useState(selectedOption || "");
  const navigate = useNavigate();
  const userObj = JSON.parse(localStorage.getItem("user")) || {};

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
    <div className="bg-neutral-900 bg-opacity-80 backdrop-blur-lg border border-neutral-700 p-8 rounded-lg shadow-xl w-[400px]">
      <h2 className="text-3xl font-semibold text-white text-center mb-4">
        {userObj?.department || "No Department"}
      </h2>
      <p className="text-gray-400 text-center mb-6">
        Please select the Regulation
      </p>

      {/* Radio Button Group */}
      <div className="space-y-4">
        {["R21", "R22", "R22R", "R24"].map((value) => (
          <label
            key={value}
            className="flex items-center bg-neutral-800 px-4 py-3 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all"
          >
            <input
              type="radio"
              name="regulation"
              value={value}
              checked={regulation === value}
              onChange={handleOptionChange}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                regulation === value
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-500"
              }`}
            >
              {regulation === value && (
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              )}
            </div>
            <span className="text-gray-300">{`Regulation ${value.replace(
              "R",
              ""
            )}`}</span>
          </label>
        ))}
      </div>

      {/* Continue Button (Visible Only if Regulation is Selected) */}
      {regulation && (
        <div className="mt-6 text-center">
          <h3 className="text-gray-300 mb-4">Selected: {regulation}</h3>
          <button
            onClick={handleContinue}
            className="w-full bg-blue-500 py-3 rounded-md text-white font-medium text-lg transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:border hover:border-white shadow-md cursor-pointer"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
