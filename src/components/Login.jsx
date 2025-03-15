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
          {/* Glassmorphism Card */}
          <div className="bg-neutral-900 bg-opacity-80 backdrop-blur-lg p-10 rounded-lg shadow-xl w-96 border border-neutral-700">
            <h2 className="text-4xl font-semibold text-center text-white mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 p-3 w-full border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 p-3 w-full border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 py-3 rounded-md text-white font-medium text-lg transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:border hover:border-white shadow-md cursor-pointer"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </form>

            {/* Forgot Password / Sign Up Links
            <div className="text-center mt-4">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Sign up
                </a>
              </p>
              <p className="text-gray-400 mt-2">
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </p>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
