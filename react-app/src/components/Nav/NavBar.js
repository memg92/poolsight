import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <nav className="bg-pnavy sticky">
      <div className="flex justify-between shadow-md py-3">
        <NavLink to="/" exact={true} activeClassName="active">
          <div className="text-pyellow px-4">poolsight</div>
        </NavLink>
        <ul className="flex items-center text-sm">
          <li className="px-2 text-ghost">
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li className="px-2 text-ghost">
            <NavLink to="/signup" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
          <li className="px-2 text-ghost">
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
