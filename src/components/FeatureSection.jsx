import React from "react";
import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <BotMessageSquare />,
      text: "Straightforward and user-friendly interface",
      description:
        "A clean, intuitive interface designed for effortless navigation. Get things done quickly without any complexity or confusion.",
    },
    {
      icon: <Fingerprint />,
      text: "Role based access control",
      description:
        "Ensure secure and customized access with role-based permissions. Grant users the right level of control based on their roles.",
    },
    {
      icon: <ShieldHalf />,
      text: "Granular level analysis with rendered visualization",
      description:
        "Gain deep insights with detailed, data-driven analysis. Visualized reports make complex information easy to understand.",
    },
    {
      icon: <BatteryCharging />,
      text: "Slash administrative workflows in a protected way",
      description:
        "Streamline administrative workflows while ensuring security. Reduce manual effort without compromising data protection.",
    },
    {
      icon: <PlugZap />,
      text: "Get the information you need with a few clicks and selects",
      description:
        "Access critical information quickly with just a few clicks. Effortless selection makes data retrieval fast and hassle-free.",
    },
    {
      icon: <GlobeLock />,
      text: "Automation for education and curriculum of the institution",
      description:
        "Automate educational workflows and curriculum management seamlessly. Enhance efficiency in institutional planning with smart automation.",
    },
  ];
  return (
    <div id="features" className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
      <div className="text-center">
        <span className="bg-neutral-900 text-blue-600 rounded-full h-6 text-sm font-medium px-3 py-1 uppercase">
          FEATURES
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wider">
          Slash the{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
            manual
          </span>{" "}
          workload
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => {
          return (
            <div key={index} className="w-full sm:1/2 lg:w-1/3">
              <div className="flex">
                <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-blue-700 justify-center items-center rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                  <p className="text-md mb-20 p-2 text-neutral-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
