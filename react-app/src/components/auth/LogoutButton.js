import React from "react";
import { logout } from "../../store/session";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => <Redirect to="/" />);
  };

  return (
    <button
      onClick={onLogout}
      className="px-2 py-1 text-pnavy transition duration-200 ease-in-out hover:bg-pnavy hover:text-ghost rounded text-left"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
