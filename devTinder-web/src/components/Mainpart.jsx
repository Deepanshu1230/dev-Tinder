import React from "react";
import Spotlight from "./ui/Spotlight";
import Login from "./Login";
import Profile from "./Profile";
import { Outlet } from "react-router";

const Mainpart = () => {
  return (
    <div>
      <div className=" w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
        {/* Radial gradient for a smooth fade effect */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Spotlight Effect */}
        <Spotlight
          className="absolute -top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Main Content */}
        <div className="relative z-100 text-center">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Mainpart;
