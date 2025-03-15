import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import Unauthorized from "./Unauthorized.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    const userObj = JSON.parse(localStorage.getItem("user")) || null;
    if (!userObj) {
      setError(true);
    } else {
      navigate("/select-department");
    }
  };

  return (
    <>
      {error ? (
        <Unauthorized />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-4xl font-semibold text-center text-black mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-black dark:text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:focus:ring-black"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-black dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-700 dark:text-white dark:focus:ring-black"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-950 hover:scale-105  transition-all duration-300 text-white py-3 rounded-md cursor-pointer active:scale-95"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
