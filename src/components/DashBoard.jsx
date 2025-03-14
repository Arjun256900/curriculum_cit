/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDepartment } from "./DepartmentContext"; // Import context hook
import { useRegulation } from "./RegulationContext";
import NavBar from "./Navbar.jsx"; // Replace SideBar with NavBar
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import "./DashBoard.css";
import FacultyDashboard from "./FacultyDashboard.jsx";

function DashBoard() {
  const { department } = useDepartment(); // Get department from context
  const { regulation } = useRegulation();
  const [selectedSemester, setSelectedSemester] = useState("1"); // Default semester
  const [courseData, setCourseData] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  });
  console.log("DEPT CONTEXT:", department);
  console.log("REG CONTEXT:", regulation)
  const location = useLocation();
  const loginData = location.state.rd || {};
  console.log(loginData);
  let user = "";
  if (loginData.includes("FACULTY")) user = "FACULTY";
  else user = "HOD";

  console.log(user);

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester); // Update the selected semester state
  };

  const updateCoursesForSemester = (semester, updatedCourses) => {
    setCourseData((prevData) => ({
      ...prevData,
      [semester]: updatedCourses, // Update only the selected semester's course data
    }));
  };

  return (
    <div className="app-container">
      <Header />
      <NavBar onSelectSemester={handleSemesterSelect} /> {/* Use NavBar */}
      {user == "FACULTY" ? (
        <FacultyDashboard />
      ) : (
        <MainContent
          selectedSemester={selectedSemester}
          courseData={courseData}
          onCourseDataChange={updateCoursesForSemester}
          department={department || location}
          regulation={regulation}
        />
      )}
      {/* <FacultyDashboard /> */}
    </div>
  );
}

export default DashBoard;
