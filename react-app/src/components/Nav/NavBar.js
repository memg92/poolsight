import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MenuButton from "./MenuButton";

const NavBar = () => {
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
    <>
      <nav className="bg-pnavy sticky top-0 w-full shadow-md">
        <div className="flex justify-between py-2 h-full">
          <NavLink to="/" exact={true} activeClassName="active">
            <div className="text-pyellow mx-4 p-2 text-4xl md:text-3xl">
              poolsight
            </div>
          </NavLink>
          <div
            onClick={openMenu}
            className="relative mx-4 p-2 z-0 transition duration-200 ease-in-out cursor-pointer hover:bg-pblue rounded"
          >
            <i className="fas fa-water text-4xl md:text-3xl text-ghost"></i>
            {showMenu && <MenuButton />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
