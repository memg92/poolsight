import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../../../store/clients";
import DayCard from "./DayCard";

export default function Dashboard() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const clients = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getClients(user.id)).then((res) => {
      if (!res.error) {
        setLoaded(true);
      } else {
        setError(res.error);
      }
    });
  }, [dispatch]);

  return (
    <>
      <DayCard day={"M"} clients={clients} />
      <DayCard day={"T"} clients={clients} />
      <DayCard day={"W"} clients={clients} />
      <DayCard day={"R"} clients={clients} />
      <DayCard day={"F"} clients={clients} />
    </>
  );
}
