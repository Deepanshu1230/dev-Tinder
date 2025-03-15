import React, { useEffect, useRef } from "react";
import ColourfulText from "../components/ui/colourful-text";
import { motion, useInView } from "motion/react";
import { Outlet, useNavigate } from "react-router";
import "../index.css";
import hero1 from "../images/download.png";
import video from "../images/feature-4.mp4";
import horsep from "../images/27 (1).png";
import super1 from "../images/superscene-object-2-0-11-removebg-preview.png"
import super2 from "../images/superscene-object-2-0-43-removebg-preview.png"
import super3 from "../images/superscene-object-2-0-52-removebg-preview.png"


const ColourfulTextDemo = () => {
  const navigate = useNavigate();
  // console.log("In main part");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <div className="pt-60 pb-52 w-11/12 flex flex-col mx-auto items-center justify-center relative overflow-hidden">

      <div className="absolute left-11 top-40 md:left-40 md:top-44">
        <motion.img src={super1} alt="" className="w-20 md:w-28" 
        initial={{
          x:0,
          y:0
        }}

        animate={{
          y:[0,12,0]
        }}
        transition={{
          duration:3,
          delay:0.8,
          repeat:Infinity
        }}
        />
      </div>

      {/* Icon 2 */}
      <div>
        <motion.img src={super2} alt="" className="w-20 md:w-28 absolute right-16 md:right-36 md:top-52"
        
        initial={{
          x:0,
          y:0
        }}

        animate={{
          x:[0,9,0],
          y:[0,12,0]
        }}
        transition={{
          duration:7,
          delay:0.8,
          repeat:Infinity
        }}
        />
      </div>


        <motion.div
          initial={{
            filter: "blur(10px)",
            y: 12,
            opacity: 0,
          }}
          animate={{
            filter: "blur(0)",
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
        >
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
            Welcome To <ColourfulText text="DevTinder" /> <br /> you will ever
            find
          </h1>
        </motion.div>

        <div>
          <button
            className="mt-5 rounded-lg bg-blue-500 px-8 py-2 font-bold text-xl text-gray-400 shadow-lg shadow-blue-500/50"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* hero section 2 */}

      <div className="relative mb-32 w-11/12  flex flex-col md:flex-row items-center justify-center mx-auto bg-black rounded-2xl border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-80"></div>

        {/* Content */}
        <div className="relative z-10 w-full md:w-[50%] p-6">
          <motion.p
            className="font-bold font-Whitney text-xl md:text-5xl uppercase text-white"
            ref={ref}
            initial={{
              x: 12,
              filter: "blur(10px)",
              opacity: 0,
            }}
            whileInView={{ x: 0, filter: "blur(0)", opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Find Your Perfect Dev Partner for Projects & Beyond!
          </motion.p>
          <div className="text-gray-300 mt-4 font-mono text-sm md:text-lg">
            <p>
              DevTinder is your go-to platform for connecting with like-minded
              developers. Whether you're looking for a coding partner, a mentor,
              or a collaborator for your next big project, DevTinder makes
              networking effortless.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative z-10">
          <motion.img
            src={hero1}
            alt=""
            ref={ref}
            className="w-[200px] md:w-full rounded-xl shadow-xl"
            initial={{
              filter: "blur(10px)",
              y: 12,
              opacity: 0,
            }}
            whileInView={{ x: 0, filter: "blur(0)", opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </div>
      </div>

      {/* Hero section 3 */}

      <div className="relative  mb-32 w-11/12  flex flex-col md:flex-row items-center justify-center mx-auto bg-black rounded-2xl border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-80"></div>

        <div>
          <video
            src={video}
            loop
            autoPlay
            muted
            className="-z-10 w-[200px] md:w-[400px] opacity-40"
          />
        </div>

        {/* Content */}
        <div className=" z-10 w-full md:w-[50%] p-6">
          <motion.p
            className="font-bold font-Whitney text-xl md:text-5xl uppercase text-white"
            ref={ref}
            initial={{
              x: 12,
              filter: "blur(10px)",
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            whileInView={{ x: 0, filter: "blur(0)", opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            "Swipe, Match, Code – Build Your Dev Network!"
          </motion.p>
          <div className="text-gray-300 mt-4 font-mono text-sm md:text-lg">
            <p>
              DevTinder helps you find the perfect developers to collaborate
              with—whether it's for a side project, a startup idea, or just to
              grow your network.
            </p>
          </div>
        </div>
      </div>

      {/* hero section 4 */}

      <div className="relative mb-32 w-11/12  flex flex-col md:flex-row items-center justify-center mx-auto bg-black rounded-2xl border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-80"></div>

        {/* Content */}
        <div className="relative z-10 w-full md:w-[50%] p-6">
          <motion.p
            className="font-bold font-Whitney text-xl md:text-5xl uppercase text-white"
            ref={ref}
            initial={{
              x: 12,
              filter: "blur(10px)",
              opacity: 0,
            }}
            whileInView={{ x: 0, filter: "blur(0)", opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Meet Like-Minded Developers & Kickstart Your Next Big Idea!
          </motion.p>
          <div className="text-gray-300 mt-4 font-mono text-sm md:text-lg">
            <p>
              Great projects start with great collaborations! DevTinder connects
              you with developers who share your passion, skills, and vision.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative z-10">
          <motion.img
            src={horsep}
            alt=""
            ref={ref}
            className="w-[200px] md:w-[500px] rounded-xl shadow-xl"
            initial={{
              filter: "blur(10px)",
              y: 12,
              opacity: 0,
            }}
            whileInView={{ x: 0, filter: "blur(0)", opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColourfulTextDemo;
