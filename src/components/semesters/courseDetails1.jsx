import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseDetails({ sem }) {
  const [courseData, setCourseData] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [requestText, setRequestText] = useState("");

  const userObj = JSON.parse(localStorage.getItem("user")) || null;
  const regulation = localStorage.getItem("regulation");
  const department = userObj?.department?.toUpperCase() || null;

  const handleRequestChange = (course) => {
    setSelectedCourse(course);
    setIsRequesting(true);
  };

  const handleCloseModal = () => {
    setIsRequesting(false);
    setSelectedCourse(null);
    setRequestText(""); // Reset input
  };

  const handleSubmitRequest = async () => {
    if (!requestText) return; // Empty request input
    console.log("Requested Change:", {
      course: selectedCourse,
      request: requestText,
    });
    const result = await fetch(
      "http://localhost:5000/api/workflow/modify-course",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send an object as the body
        body: JSON.stringify({
          course: selectedCourse,
          requestText: requestText,
          requestedBy: userObj.role,
          department: userObj.department,
        }),
      }
    );
    handleCloseModal();
  };

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
    <div className="w-full max-w-full mx-auto px-6 py-10 relative">
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
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={() => handleRequestChange(course)}
                  className="p-2 mt-3 bg-white rounded-xl text-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
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

      {/* Modal with Backdrop Blur */}
      <AnimatePresence>
        {isRequesting && selectedCourse && (
          <>
            {/* Backdrop Blur Effect */}
            <motion.div
              className="fixed inset-0  bg-opacity-30 backdrop-blur-md backdrop-brightness-75 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>

            {/* Glassmorphism Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl w-96 z-50"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
              <h2 className="text-2xl text-white font-semibold text-center">
                Request Change for {selectedCourse.course_name}
              </h2>
              <p className="text-md text-neutral-400 text-center mb-4">
                Course ID: {selectedCourse.course_code}
              </p>
              <textarea
                className="w-full p-2 bg-neutral-800 text-white rounded-md outline-none border border-neutral-600 focus:border-blue-500"
                rows="3"
                placeholder="Describe the change you want to request..."
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
              ></textarea>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRequest}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
