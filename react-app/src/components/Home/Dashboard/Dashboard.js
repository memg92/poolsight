import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../../../store/clients";
import DayCard from "./DayCard";

export default function Dashboard() {
  const state = useSelector((state) => state);
  const user = state.session.user;
  const clients = state.clientAPI.clients
    ? state.clientAPI.clients.clients
    : null;

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // console.log(loaded, clients);
  useEffect(() => {
    dispatch(getClients(user.id)).then((res) => {
      if (!res.error) {
        setLoaded(true);
      } else {
        setError(res.error);
      }
    });
  }, [dispatch]);

  const days = ["M", "T", "W", "R", "F"];

  /* <DayCard day={"M"} clients={clients} />
  <DayCard day={"T"} clients={clients} />
  <DayCard day={"W"} clients={clients} />
  <DayCard day={"R"} clients={clients} />
  <DayCard day={"F"} clients={clients} /> */
  return loaded ? (
    <>
      {days.map((day) => {
        return <DayCard day={day} key={day} clients={clients} />;
      })}
    </>
  ) : (
    <h1>Loading Clients</h1>
  );
}
