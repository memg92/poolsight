import React from "react";
import { NavLink } from "react-router-dom";
import dashboard from "../../assets/dashboard.mov";
import repairhistory from "../../assets/repairhistory.mov";

export default function SplashPage() {
  const video1 = document.querySelector(".myvideo1");
  const video2 = document.querySelector(".myvideo2");

  const playVideo = (e) => {
    e.target.play();
  };
  const pauseVideo = (e) => {
    e.target.pause();
  };

  return (
    <div className="mx-auto h-full bg-pblue bg-opacity-70">
      <div className="xl:flex px-20 py-8 items-center justify-center  text-ghost border-b-4 border-pnavy border-opacity-50">
        <div className="px-4 py-6 text-center">
          <h1 className="text-2xl py-2 font-semibold">
            View all of your clients in an easy-to-use Dashboard!
          </h1>
          <NavLink
            to="/signup"
            className="p-2 hover:bg-pnavy hover:bg-opacity-80 underline rounded-lg"
          >
            Learn More
          </NavLink>
        </div>
        <div className="pb-6">
          <video
            src={dashboard}
            loop
            muted
            playsInline
            onMouseOver={playVideo}
            onMouseOut={pauseVideo}
            alt="Dashboard"
            className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl h-auto shadow-lg rounded-lg border-2 border-pnavy"
          />
        </div>
      </div>
      <div className="xl:flex px-20 py-8 items-center justify-evenly text-ghost">
        <div className="pt-6">
          <video
            src={repairhistory}
            loop
            muted
            playsInline
            onMouseOver={playVideo}
            onMouseOut={pauseVideo}
            alt="Dashboard"
            className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl h-auto shadow-lg rounded-lg border-2 border-pnavy"
          />
        </div>
        <div className="px-4 py-6 text-center">
          <h1 className="text-2xl py-2 font-semibold">
            Easily add your clients and keep track of their pools, including
            repairs!
          </h1>
          <NavLink
            to="/signup"
            className="p-2 hover:bg-pnavy hover:bg-opacity-80 underline rounded-lg"
          >
            Learn More
          </NavLink>
        </div>
      </div>
    </div>
  );
}
