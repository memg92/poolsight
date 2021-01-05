import React from "react";
import { logout } from "../../store/session";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    dispatch(logout());
    return <Redirect to="/" />;
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
