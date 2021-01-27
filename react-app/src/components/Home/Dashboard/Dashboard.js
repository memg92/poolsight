import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPools } from "../../../store/pools";
import DayCard from "./DayCard";

export default function Dashboard() {
  const state = useSelector((state) => state);
  const user = state.session.user;
  const pools = state.poolAPI.pools ? state.poolAPI.pools : null;

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(getPools()).then(() => {
        setLoaded(true);
      });
    }
    return () => (isMounted = false);
  }, [dispatch]);

  const days = ["M", "T", "W", "R", "F"];

  return loaded ? (
    <div className="h-screen z-10">
      <div className="p-2 mx-4 mt-6 mb-2 text-3xl text-pnavy font-bold shadow-md rounded-lg">
        My Routes
      </div>
      {days.map((day) => {
        return <DayCard day={day} key={day} pools={pools} />;
      })}
    </div>
  ) : (
    <div className="h-screen">
      <div className="p-2 mx-4 mt-6 mb-2 text-3xl text-pnavy font-bold shadow-sm">
        My Routes
      </div>
      <div className="flex flex-col items-center mt-20 text-pnavy text-4xl">
        <div className="pb-2">Loading...</div>
        <i className="fas fa-spinner animate-spin"></i>
      </div>
    </div>
  );
}
