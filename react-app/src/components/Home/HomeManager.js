import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";

export default function HomeManager() {
  const user = useSelector((state) => state.session.user);

  const homepage = user ? <Dashboard /> : <h1>My homepage</h1>;

  return homepage;
}
