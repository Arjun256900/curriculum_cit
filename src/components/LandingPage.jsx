import React, { useState, useEffect } from "react";
import logo from "../assets/cit_logo2.png";
import { Menu, X } from "lucide-react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import LandingWorkflow from "./LandingWorkflow";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

const LandingNavbar = () => {
  const token = localStorage.getItem("token");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // New state to control notification visibility

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const navItems = [
    { label: "Features", href: "features" },
    { label: "Workflow", href: "workflow" },
    { label: "Credits", href: "credits" },
  ];

  const smoothScroll = (event, targetId) => {
    event.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Set the timeout to hide the notification after 5 seconds
  useEffect(() => {
    if (token) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Duration of the notification before it disappears

      // Cleanup the timer when the component is unmounted or when the token changes
      return () => clearTimeout(timer);
    }
  }, [token]); // Trigger when token changes

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <img src={logo} className="h-10 w-10 mr-2" alt="CIT logo" />
              <span className="text-2xl tracking-wide">
                CIT<span className="text-blue-500">.AI</span>
              </span>
            </div>
            <ul className="hidden lg:flex space-x-12">
              {navItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className="text-xl hover:text-blue-500 transition duration-300"
                      href={item.href}
                      onClick={(e) => smoothScroll(e, item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <motion.div
              className="hidden lg:flex justify-center items-center space-x-12"
              animate={{
                opacity: [0.3, 1, 0.3], // Change opacity to create dim to light-up effect
                scale: [0.98, 1, 0.98], // Slight scale change for emphasis
              }}
              transition={{
                duration: 2, // Duration of each cycle
                repeat: Infinity, // Repeat the animation indefinitely
                repeatType: "loop", // Loop the animation
                ease: "easeInOut", // Ease for a smooth transition
              }}
            >
              <a
                href={`${token ? "/dashboard" : "/login"}`}
                className="py-2 px-6 text-[17px] border rounded-md hover:bg-neutral-300 hover:text-blue-600 transition duration-300"
              >
                {token ? "To Dashboard" : "Log in"}
              </a>
            </motion.div>
            <div className="lg:hidden md:flex flex-col justify-end cursor-pointer">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul>
                {navItems.map((item, index) => {
                  return (
                    <li className="py-4" key={index}>
                      <a className="text-xl" href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="flex space-x-6">
                <a href="#" className="py-2 px-3 border rounded-md">
                  Log in
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
      <HeroSection />
      <div className="max-w-7xl mx-auto py-20 px-6">
        <FeatureSection />
        <LandingWorkflow />
        <Testimonials />
        <Footer />
      </div>
      {/* Conditional notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed top-20 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <p>You are logged in! Navigate to dashboard and get started!</p>
            {/* Timeout bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-red-500 mt-2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingNavbar;
