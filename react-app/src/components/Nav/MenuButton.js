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
        <li className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded">
          <NavLink to="/client/create" exact={true} activeClassName="active">
            Add Client
          </NavLink>
        </li>
        <li className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded">
          <LogoutButton />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded">
          <NavLink to="/signup" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <ul className="flex flex-col absolute right-5 text-2xl md:text-lg bg-ghost rounded w-36 md:w-32 p-2 justify-start">
      {sessionLinks}
    </ul>
  );
};

export default MenuButton;
