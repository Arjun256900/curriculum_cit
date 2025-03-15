import React, { useState } from "react";
import Card from "./Card.jsx";

function DepartmentSelect() {
  const [selectedOption, setSelectedOption] = useState(null);
  const userObj = JSON.parse(localStorage.getItem("user")) || {};

  // Handle change for the radio buttons
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <Card
        dept={userObj.department}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
      />
    </div>
  );
}

export default DepartmentSelect;
