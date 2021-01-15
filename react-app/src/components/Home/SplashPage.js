import React from "react";
import { NavLink } from "react-router-dom";
import dashboard from "../../assets/GIFs/dashboard.gif";

export default function SplashPage() {
  return (
    <div>
      <div>
        <div>
          <h1>View all of your clients in an easy-to-use Dashboard!</h1>
          <NavLink to="/signup">Learn More</NavLink>
        </div>
        <div>
          <img src={dashboard} alt="Dashboard" className="w-auto h-56" />
        </div>
      </div>
    </div>
  );
}
