import React, { useState } from "react";
import NewUser from "./modal/newUser";

export default function Getstart({ users, addNewUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative bg-gradient-to-br from-teal-600 via-blue-700 to-indigo-900 rounded-3xl shadow-xl min-h-[350px] min-w-[750px] overflow-hidden p-10 flex flex-col items-center justify-center">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl -top-16 -left-20"></div>
          <div className="absolute w-80 h-80 bg-gradient-to-t from-green-500 to-cyan-400 rounded-full blur-3xl -bottom-20 right-12"></div>
        </div>

        {/* Animated Waves */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-24 fill-blue-500 opacity-30 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fillOpacity="1"
              d="M0,192L40,186.7C80,181,160,171,240,170.7C320,171,400,181,480,170.7C560,160,640,128,720,112C800,96,880,96,960,106.7C1040,117,1120,139,1200,144C1280,149,1360,139,1400,133.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Content Section */}
        <div className="relative z-10 text-center text-white space-y-4">
          <h1 className="text-4xl font-extrabold tracking-wide">
            Welcome to <span className="text-yellow-400">Finance Hub</span>
          </h1>
          <p className="text-lg font-light">
            Manage Your Money Inflows and Outflows, Built on Trust.
          </p>
        </div>

        {/* Button Section */}
        <div className="relative z-10">
          <button
            className="px-6 py-3 mt-4 text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 hover:shadow-green-500/50 transform hover:scale-110 transition duration-500 ease-in-out"
            onClick={() => setIsOpen(true)}
          >
            Get Started
          </button>
        </div>
      </div>
      {isOpen && (
        <NewUser
          close={() => setIsOpen(false)}
          users={users}
          addNewUser={addNewUser}
        />
      )}
    </>
  );
}
