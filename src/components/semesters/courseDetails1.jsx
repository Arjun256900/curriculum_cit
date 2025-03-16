import { useState, useEffect } from "react";

export default function CourseDetails({ sem }) {
  const [courseData, setCourseData] = useState([]);
  const userObj = JSON.parse(localStorage.getItem("user")) || null;
  const regulation = localStorage.getItem("regulation");
  const department = userObj?.department?.toUpperCase() || null;

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!sem) {
        setCourseData([{ course_name: "Missing semester info!" }]);
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
        setCourseData(data.rows || []);
      } catch (error) {
        console.error("Error fetching course data", error);
      }
    };

    fetchCourseData();
  }, [sem, department, regulation]);

  return (
    <div className="w-full max-w-full mx-auto px-6 py-10">
      <h1 className="text-5xl text-blue-400 font-bold mb-8 text-center tracking-wide">
        Courses for Semester {sem}
      </h1>
      {Array.isArray(courseData) && courseData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((course) => (
            <div
              key={course.course_id || Math.random()}
              className="bg-neutral-800 rounded-xl shadow-md p-6 transition duration-300 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.6)] cursor-pointer"
            >
              <h2 className="text-3xl font-semibold text-white mb-4 text-center underline tracking-wider">
                {course.course_name}
              </h2>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Course ID:
                </span>{" "}
                {course.course_code}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Category:
                </span>{" "}
                {course.category}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Type:
                </span>{" "}
                {course.tp}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Credits:
                </span>{" "}
                {course.credits}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">LTP:</span>{" "}
                {course.ltp}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Gate/Common:
                </span>{" "}
                {course.gate_common}
              </p>
              <div className="flex items-center justify-center w-full ">
                <button className="p-2 mt-3 bg-white rounded-xl text-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
                  {" "}
                  Request Change
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-300 text-lg text-center">
          No courses available for this semester.
        </p>
      )}
    </div>
  );
}
