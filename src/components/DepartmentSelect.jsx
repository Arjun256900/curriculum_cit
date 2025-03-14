import React, { useState } from "react";
import Card from "./Card.jsx";
import "./CardAndSelectStyle.css";

function DepartmentSelect() {
  const [selectedOption, setSelectedOption] = useState(null);
  const userObj = localStorage.getItem("user");

  // Handle change for the radio buttons
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="grid-container">
      <Card
        dept={userObj.department}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
      />
    </div>
  );
}

export default DepartmentSelect;
