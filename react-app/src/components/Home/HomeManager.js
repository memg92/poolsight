import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import SplashPage from "./SplashPage";

export default function HomeManager() {
  const user = useSelector((state) => state.session.user);

  const homepage = user ? <Dashboard /> : <SplashPage />;

  return homepage;
}
