import { useState, useEffect } from "react";

export default function courseDetails({ sem }) {
  const [courseData, setCourseData] = useState([]);
  const userObj = JSON.parse(localStorage.getItem("user")) || null;

  const regulation = localStorage.getItem("regulation");
  const department = userObj.department || null;

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!sem) {
        const missingSem = "Missing semester info!";
        setCourseData(missingSem);
        return;
      }
      try {
        const result = await fetch(
          `http://localhost:5000/api/courses/?sem=${sem}&department=${department}&regulation=${regulation}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await result.json();
        setCourseData(data.rows);
      } catch (error) {
        console.error("Error fetching course data", error);
        return;
      }
    };

    fetchCourseData();
  }, []);

  console.log("Course data: ", courseData);
  return (
    <div className="w-full flex items-center justify-center gap-10">
      {courseData.map((course) => (
        <div
          key={course.course_id}
          className="bg-black text-white border-1 border-white p-4 w-1/2 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col hover:border-1 hover:border-white hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.8)]"
        >
          <div className="flex flex-col">
            <h2 className="text-2xl text-center w-full mb-2">
              {course.course_name}
            </h2>
            <p>Course ID: {course.course_code}</p>
            <p>Course Category: {course.category}</p>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2">
              <p>Theory/Practical: {course.tp}</p>
              <p>Gate/Common: {course.gate_common}</p>
              <p>Common Dept: {course.common_dept}</p>
            </div>
            <div className="w-1/2">
              <p>Credits: {course.credits}</p>
              <p>LTP: {course.ltp}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
