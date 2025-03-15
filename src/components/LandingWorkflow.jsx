import React from "react";
import { CheckCircle2 } from "lucide-react";
import codeImg from "../assets/code.jpg";

const LandingWorkflow = () => {
  const checklistItems = [
    {
      title: "Raise requests as a faculty with ease",
      description:
        "Send change requests for courses to your department's HOD with just a click. Fill out the pop up, click send. It's that simple",
    },
    {
      title: "Review requests as a HOD",
      description:
        "As a HOD, Review requests raised by the faculties your department and decide to either accept, reject or forward it to Deans",
    },
    {
      title: "View requests forwarded by HODs",
      description:
        "As a Dean, view all the requests that are forwarded by the HODs' to you, and choose between accepting, rejecting or forwarding cirtical ones to the Controller of Examinations (CoE)",
    },
    {
      title: "Controller of Examinations (CoE)",
      description:
        "As a member of the CoE, decide to either approve the request or reject it as non-important",
    },
    {
      title: "Track of the status of the request",
      description: "Be informed about the request you raised or forwarded",
    },
  ];
  return (
    <div id="workflow" className="mt-20">
      {/* Heading Section */}
      <h2 className="text-5xl sm:text-5xl max-w-6xl mx-auto text-center mt-6 tracking-wider">
        Accelerate the{" "}
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          curriculum workflow
        </span>
      </h2>

      {/* Main Content Container */}
      <div className="flex flex-wrap justify-center items-center max-w-6xl mx-auto mt-10">
        {/* Image Section */}
        <div className="p-2 w-full lg:w-1/2 flex justify-center">
          <img
            src={codeImg}
            alt="Coding"
            className="w-full h-auto max-w-md lg:max-w-full"
          />
        </div>

        {/* Checklist Section */}
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-start mb-12">
              <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 flex justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingWorkflow;
