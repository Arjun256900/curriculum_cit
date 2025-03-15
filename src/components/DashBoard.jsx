import React, { useState } from "react";
import NavBar from "./Navbar.jsx";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import "./DashBoard.css";
import FacultyDashboard from "./FacultyDashboard.jsx";
import Unauthorized from "./Unauthorized.jsx";

function DashBoard() {
  const regulation = localStorage.getItem("regulation");
  const userObj = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token") || null;
  const location = window.location.pathname;
  console.log("Location in dash :", location);
  const [selectedSemester, setSelectedSemester] = useState("1");
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

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
  };

  const updateCoursesForSemester = (semester, updatedCourses) => {
    setCourseData((prevData) => ({
      ...prevData,
      [semester]: updatedCourses,
    }));
  };

  return (
    <>
      {token ? (
        <div className="app-container">
          <Header location = {location}/>
          <NavBar onSelectSemester={handleSemesterSelect} />
          {userObj.role == "faculty" ? (
            <FacultyDashboard />
          ) : (
            <MainContent
              selectedSemester={selectedSemester}
              courseData={courseData}
              onCourseDataChange={updateCoursesForSemester}
              department={userObj.department}
              regulation={regulation}
            />
          )}
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default DashBoard;
