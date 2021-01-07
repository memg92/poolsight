import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPools } from "../../../store/pools";
import DayCard from "./DayCard";

export default function Dashboard() {
  const state = useSelector((state) => state);
  const user = state.session.user;
  const pools = state.poolAPI.pools ? state.poolAPI.pools.pools : null;

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // console.log(loaded, pools);
  useEffect(() => {
    dispatch(getPools(user.id)).then((res) => {
      if (!res.error) {
        setLoaded(true);
      } else {
        setError(res.error);
      }
    });
  }, [dispatch]);

  const days = ["M", "T", "W", "R", "F"];

  return loaded ? (
    <>
      <div className="p-2 mx-4 mt-6 mb-2 text-3xl text-pnavy font-bold shadow-sm">
        My Routes
      </div>
      {days.map((day) => {
        return <DayCard day={day} key={day} pools={pools} />;
      })}
    </>
  ) : (
    <h1>Loading pools</h1>
  );
}
