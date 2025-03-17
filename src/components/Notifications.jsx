import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, ArrowRightCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const tabs = ["all", "accepted", "rejected", "forwarded", "pending"];
  const [selectedRequest, setSelectedRequest] = useState(null);
  const userObj = JSON.parse(localStorage.getItem("user"));
  const [isCourseModal, setIsCourseModal] = useState(false);
  const [comment, setComment] = useState({
    hodComment: "",
    deanComment: "",
  });
  const [name, setName] = useState(""); //For HOD name

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    // Using toLocaleString for formatting the date in a human-readable format
    return date.toLocaleString("en-US", {
      weekday: "long", // e.g., "Monday"
      year: "numeric", // e.g., "2025"
      month: "long", // e.g., "March"
      day: "numeric", // e.g., "17"
      hour: "2-digit", // e.g., "02"
      minute: "2-digit", // e.g., "32"
      second: "2-digit", // e.g., "12"
      hour12: true, // Use 12-hour format
    });
  }

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/workflow/all-notifications?department=${userObj.department}&role=${userObj.role}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data.requests);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleRequestClick = (notification) => {
    if (userObj.role == "faculty") return;
    if (
      userObj.role === "hod" &&
      (notification.statusForNoti == "accepted" ||
        notification.statusForNoti === "rejected" ||
        notification.statusForNoti === "forwarded")
    )
      return;
    if (
      userObj.role === "dean" &&
      (notification.statusForNoti === "rejected" ||
        notification.statusForNoti === "accepted")
    )
      return;
    console.log(notification);
    setSelectedRequest(notification);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setComment({
      hodComment: "",
      deanComment: "",
    }); // Reset input
    setName(""); // Reset name input
  };

  const handleAction = async (action) => {
    // Handle different roles
    const correctAction = action.charAt(0).toUpperCase() + action.slice(1);
    if (userObj.role === "hod") {
      const result = await fetch(
        "http://localhost:5000/api/workflow/hod-action",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            course: selectedRequest,
            requestText: selectedRequest.requestText,
            hodName: name,
            facultyName: selectedRequest.facultyName,
            requestedBy: selectedRequest.requestedBy,
            department: selectedRequest.department,
            lastViewed: Date.now(),
            hod_comment: comment.hodComment,
            dean_comment: null,
            status: `${correctAction} by HOD ${name} of department ${selectedRequest.department}`,
            statusForNoti: action,
            acceptedBy: `${correctAction} by HOD ${name} of department ${selectedRequest.department}`,
            action: action,
          }),
        }
      );
      if (result.ok) {
        handleCloseModal();
        console.log("Request accepted");
        fetchNotifications();
      } else {
        console.log("Request was not accepted due to an error");
      }
    } else if (userObj.role === "dean") {
      const result = await fetch(
        "http://localhost:5000/api/workflow/dean-action",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            course: selectedRequest,
            requestText: selectedRequest.requestText,
            hodName: name,
            facultyName: selectedRequest.facultyName,
            requestedBy: selectedRequest.requestedBy,
            department: selectedRequest.department,
            lastViewed: Date.now(),
            hod_comment: comment.hodComment,
            dean_comment: comment.deanComment,
            status: `${correctAction} by DEAN Dr. Neethi`,
            statusForNoti: action,
            acceptedBy: `${correctAction} by DEAN Dr. Neethi `,
            action: action,
          }),
        }
      );
      if (result.ok) {
        handleCloseModal();
        console.log("Action taken by DEAN");
        fetchNotifications();
      } else {
        console.log("Action was not taken due to an error");
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-900/10 border border-green-500 text-white shadow-md shadow-green-500/20";
      case "rejected":
        return "bg-red-900/10 border border-red-500 text-white shadow-md shadow-red-500/20";
      case "forwarded":
        return "bg-blue-900/10 border border-blue-500 text-white shadow-md shadow-blue-500/20";
      case "pending":
        return "bg-yellow-900/10 border border-yellow-500 text-white shadow-md shadow-yellow-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-500";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "forwarded":
        return <ArrowRightCircle className="w-5 h-5 text-blue-400" />;
      case "pending":
        return (
          <div className="flex items-center justify-center w-5 h-5 bg-amber-400 text-white rounded-full">
            P
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "forwarded":
        return "Forwarded";
      case "pending":
        return "Pending";
      default:
        return "";
    }
  };

  const handleCourseModal = (request) => {
    setIsCourseModal(true);
    setSelectedRequest(request);
  };
  const handleCourseModalClose = () => {
    setIsCourseModal(false);
    setSelectedRequest(null);
  };
  // Get all the requests when the page loads
  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter(
          (notification) => notification.statusForNoti === activeTab
        );

  return (
    <>
      <div className="min-h-screen text-white p-4 sm:p-6 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-center sm:text-left">
            Curriculum Change Notifications
          </h1>
        </div>

        {/* Tab Navigation (Responsive) */}
        <div className="overflow-x-auto pb-2">
          <div className="flex flex-wrap sm:flex-nowrap w-full justify-between">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap w-full sm:w-auto lg:flex-grow ml-3 mb-2
        ${
          activeTab === tab
            ? "bg-gray-700 text-white"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span
                  className={`ml-2 text-black px-2 py-1 rounded-full ${
                    tab == "pending" ? "bg-amber-300" : ""
                  } ${tab == "all" ? "bg-white" : ""} ${
                    tab == "rejected" ? "bg-red-400" : ""
                  } ${tab == "accepted" ? "bg-green-400" : ""}
          ${tab == "forwarded" ? "bg-blue-400" : ""}`}
                >
                  {
                    notifications.filter(
                      (n) => tab === "all" || n.statusForNoti === tab
                    ).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List - Responsive Grid */}
        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.course.course_code}
                onClick={() => {
                  handleRequestClick(notification);
                }}
                className={`relative p-4 sm:p-6 border-l-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${getStatusStyle(
                  notification.statusForNoti
                )}`}
              >
                {/* Status Label in Top-Right Corner */}
                <span
                  className={`absolute mx-4 sm:mx-6 sm:my-1 lg:mx-6 scale-150 right-2 px-3 py-1 text-xs font-semibold rounded-lg ${getStatusStyle(
                    notification.statusForNoti
                  )}`}
                >
                  {getStatusLabel(notification.statusForNoti)}
                </span>

                <div className="flex items-center space-x-2 mt-4 max-w-[85%]">
                  <span>{getStatusBadge(notification.statusForNoti)} </span>
                  <h1 className="text-lg sm:text-xl font-semibold underline lg:text-3xl">
                    {userObj.role === "dean"
                      ? notification.course.course.course_name
                      : notification.course.course_name}
                  </h1>
                </div>

                <h2
                  className={`text-md sm:text-base font-semibold text-right mt-2 lg:text-2xl
                  ${
                    notification.statusForNoti === "forwarded"
                      ? "text-blue-500"
                      : notification.statusForNoti === "rejected"
                      ? "text-red-500"
                      : notification.statusForNoti === "accepted"
                      ? "text-green-500"
                      : notification.statusForNoti === "pending"
                      ? "text-yellow-500"
                      : ""
                  }
                  `}
                >
                  Status: {notification.status}
                </h2>
                <p className="mt-2 text-xs sm:text-sm lg:text-2xl">
                  <span
                    className={`${
                      notification.statusForNoti === "forwarded"
                        ? "text-blue-500"
                        : notification.statusForNoti === "rejected"
                        ? "text-red-500"
                        : notification.statusForNoti === "accepted"
                        ? "text-green-500"
                        : notification.statusForNoti === "pending"
                        ? "text-yellow-500"
                        : ""
                    }`}
                  >
                    Description:
                  </span>{" "}
                  {notification.requestText}
                </p>
                <p
                  className={`${
                    notification.statusForNoti === "forwarded"
                      ? "text-blue-500"
                      : notification.statusForNoti === "rejected"
                      ? "text-red-500"
                      : notification.statusForNoti === "accepted"
                      ? "text-green-500"
                      : notification.statusForNoti === "pending"
                      ? "text-yellow-500"
                      : ""
                  }`}
                >
                  Details about the request
                </p>
                <hr />
                <div className="mt-4 sm:text-xl lg:text-xl text-gray-300">
                  <p>
                    Requested Role: {notification.requestedBy.toUpperCase()}
                  </p>
                  {notification.requestedBy === "faculty" && (
                    <p>
                      Faculty Name:{" "}
                      {userObj.role === "dean"
                        ? notification.name
                        : notification.facultyName}
                    </p>
                  )}
                  {notification.requestedBy === "hod" && (
                    <p>HOD Name: {notification.name}</p>
                  )}
                  <p>
                    Last reviewed by authorities :{" "}
                    {formatDate(notification.lastViewed)}
                  </p>
                  <p>HOD's comment : {notification.hodComment}</p>
                  <p>Dean's comment : {notification.deanComment}</p>
                </div>
                <div className="flex items-center justify-center mt-3">
                  <button
                    onClick={() => {
                      handleCourseModal(notification);
                    }}
                    className={`p-3 rounded-2xl cursor-pointer transition duration-300 ${
                      notification.statusForNoti === "forwarded"
                        ? "bg-blue-500"
                        : notification.statusForNoti === "rejected"
                        ? "bg-red-500"
                        : notification.statusForNoti === "accepted"
                        ? "bg-green-500"
                        : notification.statusForNoti === "pending"
                        ? "bg-yellow-500"
                        : ""
                    } ${
                      notification.statusForNoti === "forwarded"
                        ? "hover:bg-blue-700"
                        : notification.statusForNoti === "rejected"
                        ? "hover:bg-red-700"
                        : notification.statusForNoti === "accepted"
                        ? "hover:bg-green-700"
                        : notification.statusForNoti === "pending"
                        ? "hover:bg-yellow-700"
                        : ""
                    }`}
                  >
                    {" "}
                    Details of the course
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No notifications available.
            </p>
          )}
        </div>
      </div>
      {/* Modal with Backdrop Blur */}
      <AnimatePresence>
        {selectedRequest && !isCourseModal && (
          <>
            <motion.div
              className="fixed inset-0  bg-opacity-30 backdrop-blur-md backdrop-brightness-75 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>

            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl z-50"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
              <h2 className="text-2xl text-white font-semibold text-center">
                Perform an action for the change request{" "}
                {selectedRequest.course.course_name}
              </h2>
              <p className="text-md text-neutral-400 text-center mb-4">
                Course ID: {selectedRequest.course.course_code}
              </p>
              <input
                placeholder={userObj.role == "hod" ? "HOD name" : "Dean's name"}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-neutral-800 text-white rounded-md outline-none border border-neutral-600 focus:border-blue-500 mb-2"
              />
              <textarea
                value={
                  userObj.role === "dean"
                    ? comment.deanComment
                    : comment.hodComment
                }
                onChange={(e) => {
                  if (userObj.role === "dean") {
                    setComment({
                      ...comment,
                      deanComment: e.target.value,
                    });
                  } else {
                    setComment({
                      ...comment,
                      hodComment: e.target.value,
                    });
                  }
                }}
                className="w-full p-2 bg-neutral-800 text-white rounded-md outline-none border border-neutral-600 focus:border-blue-500"
                rows="3"
                placeholder="Describe the reason for your action..."
              ></textarea>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAction("accepted")}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
                >
                  Accept Request
                </button>
                <button
                  onClick={() => handleAction("rejected")}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Reject Request
                </button>
                {userObj.role === "hod" && (
                  <button
                    onClick={() => handleAction("forwarded")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                  >
                    Forward Request
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCourseModal && (
          <>
            <motion.div
              className="fixed inset-0  bg-opacity-30 backdrop-blur-md backdrop-brightness-75 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg shadow-xl z-50"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
            >
              <h2 className="text-3xl font-semibold text-white mb-4 text-center underline tracking-wider">
                {selectedRequest.course.course_name}
              </h2>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Course code :
                </span>{" "}
                {selectedRequest.course.course_code}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Category:
                </span>{" "}
                {selectedRequest.course.category}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Type:
                </span>{" "}
                {selectedRequest.course.tp}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Credits:
                </span>{" "}
                {selectedRequest.course.credits}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">LTP:</span>{" "}
                {selectedRequest.course.ltp}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Gate/Common:
                </span>{" "}
                {selectedRequest.course.gate_common}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Semester :
                </span>{" "}
                {selectedRequest.course.semester}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Regulation :
                </span>{" "}
                {selectedRequest.course.regulation}
              </p>
              <p className="text-md text-neutral-300">
                <span className="text-blue-500 font-medium text-2xl">
                  Common for departments:
                </span>{" "}
                {selectedRequest.course.common_dept.map((dept) => {
                  return <span>{dept}, </span>;
                })}
              </p>
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={handleCourseModalClose}
                  className="p-2 mt-3 bg-white rounded-xl text-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  Close details
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
