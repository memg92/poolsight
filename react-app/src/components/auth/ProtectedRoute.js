import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const state = useSelector((state) => state);
  const user = state.session.user;

  return (
    <Route {...props}>{user ? props.children : <Redirect to="/login" />}</Route>
  );
};

export default ProtectedRoute;
