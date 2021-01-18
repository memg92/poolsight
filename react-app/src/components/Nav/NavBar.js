import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import SearchForm from "../Search/SearchForm";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const user = useSelector((state) => state.session.user);

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

  const openSearch = (e) => {
    e.preventDefault();
    if (searchOpen) {
      setSearchOpen(false);
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-pnavy sticky top-0 w-full shadow-md">
        <div className="flex justify-between py-2 h-full">
          <NavLink to="/" exact={true} activeClassName="active">
            <div className="text-pyellow mx-4 p-2 text-4xl md:text-3xl">
              poolsight
            </div>
          </NavLink>
          <div className="flex items-center">
            {searchOpen && <SearchForm />}
            {user && (
              <i
                onClick={openSearch}
                className="fas fa-search text-2xl md:text-xl text-ghost cursor-pointer"
              ></i>
            )}
            <div
              onClick={openMenu}
              className="relative mx-4 p-2 z-0 transition duration-200 ease-in-out cursor-pointer hover:bg-pblue rounded"
            >
              <i className="fas fa-water text-4xl md:text-3xl text-ghost"></i>
              {showMenu && <MenuButton />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
