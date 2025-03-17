import React from "react";
import video1 from "../assets/landing_video1.mp4";
import video2 from "../assets/landing_video2.mp4";
import video3 from "../assets/landing_video3.mp4";

const HeroSection = () => {
  const token = localStorage.getItem('token');
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Background Video with Blur & Overlay */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover blur-md opacity-50"
      >
        <source src={video3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Section */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-wider text-white">
          Where education meets a{" "}
          <span className="bg-gradient-to-r from-blue-300 to-blue-700 text-transparent bg-clip-text">
            next-gen automation
          </span>
        </h1>
        <p className="text-lg max-w-4xl mx-auto text-neutral-300 mt-10">
          Leverage the power of automation to eliminate tedious workloads,
          streamline complex processes, and boost efficiency effortlessly. Get
          important and confidential tasks done securely with just a few clicks.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <a
            href={`${token ? "/dashboard" : "/login"}`}
            className="bg-gradient-to-r from-blue-500 to-blue-700 py-3 px-6 rounded-md text-white text-lg font-medium transition duration-300 hover:bg-gradient-to-r hover:from-neutral-400 hover:to-neutral-200 hover:text-blue-600 active:scale-95 shadow-lg"
          >
            {token ? "Go to your dashboard" : "Log in to get started"}
          </a>
        </div>
        <div className="flex mt-10 justify-center">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg h-100 w-145 border border-blue-700 shadow-blue-300 mx-5 my-4 object-cover"
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            autoPlay
            loop
            muted
            className="rounded-lg h-100 w-145 border border-blue-700 shadow-blue-300 mx-5 my-4 object-cover"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
