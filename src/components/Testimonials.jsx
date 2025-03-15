import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      user: "John Doe",
      department: "Infomation Technology",
      text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
    },
    {
      user: "Jane Smith",
      department: "Computer Science",
      text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
    },
    {
      user: "David Johnson",
      department: "Artificial Intelligence and Machine Learning",
      text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
    },
    {
      user: "Ronee Brown",
      department: "Electical and Electronics Engineering",
      text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
    },
    {
      user: "Michael Wilson",
      codepartmentmpany: "Cyber Security",
      text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
    },
    {
      user: "Emily Davis",
      department: "Mechanical Engineering",
      text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
    },
  ];
  return (
    <div id="credits" className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin">
              <p className="italic">"{testimonial.text}"</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcrHcQt96h7px8LRKGW9LQsr8TUZdP0gUYw&s"
                  alt="Profile picture"
                />
                <div>
                  <h4 className="text-blue-500">{testimonial.user}</h4>
                  <span className="text-md font-normal text-neutral-400">
                    {testimonial.department}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
