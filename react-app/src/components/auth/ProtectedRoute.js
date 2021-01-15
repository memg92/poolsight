import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const state = useSelector((state) => state);
  const user = state.session.user;
  const client = state.clientAPI.client;
  if (user && client) {
    if (client.user_id !== user.id) {
      return <Redirect to="/" />;
    }
  }
  return (
    <Route {...props}>{user ? props.children : <Redirect to="/login" />}</Route>
  );
};

export default ProtectedRoute;
