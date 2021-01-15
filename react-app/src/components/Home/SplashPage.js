import React from "react";
import { NavLink } from "react-router-dom";
import dashboard from "../../assets/GIFs/dashboard.gif";
import newclient from "../../assets/GIFs/newclient.gif";
import newtask from "../../assets/GIFs/newtask.gif";

export default function SplashPage() {
  return (
    <div className="mx-auto py-10 bg-pblue ">
      <div className="flex px-10 py-6 items-center justify-evenly bg-pblue bg-opacity-80 text-ghost">
        <div className="pr-4">
          <h1 className="text-2xl font-semibold">
            View all of your clients in an easy-to-use Dashboard!
          </h1>
          <NavLink to="/signup">Learn More</NavLink>
        </div>
        <div>
          <img src={dashboard} alt="Dashboard" className="w-auto h-56" />
        </div>
      </div>
      <div className="flex px-12 py-6 items-center justify-evenly bg-ghost text-pnavy">
        <div>
          <img src={newclient} alt="Dashboard" className="w-auto h-56" />
        </div>
        <div className="pl-4">
          <h1 className="text-2xl font-semibold">
            Easily add your clients, including all their relevant pool details
          </h1>
          <NavLink to="/signup">Learn More</NavLink>
        </div>
      </div>
      <div className="flex px-12 py-6 items-center justify-evenly bg-pblue bg-opacity-80 text-ghost">
        <div className="pr-4">
          <h1 className="text-2xl font-semibold">
            Keep track of all of your repairs for each client, all in the palm
            of your hand!
          </h1>
          <NavLink to="/signup">Learn More</NavLink>
        </div>
        <div>
          <img src={newtask} alt="Dashboard" className="w-auto h-56" />
        </div>
      </div>
    </div>
  );
}
