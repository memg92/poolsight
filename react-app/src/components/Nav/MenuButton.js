import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

const MenuButton = () => {
  const user = useSelector((state) => state.session.user);

  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <NavLink
          to="/client/create"
          exact={true}
          className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded"
        >
          Add Client
        </NavLink>
        <LogoutButton />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink
          to="/login"
          exact={true}
          activeClassName="active"
          className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded"
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          exact={true}
          activeClassName="active"
          className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded"
        >
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="flex flex-col animate-scale-in-ver-top absolute right-5 text-2xl md:text-lg bg-ghost rounded w-36 md:w-32 p-2 justify-start">
      {sessionLinks}
    </div>
  );
};

export default MenuButton;
