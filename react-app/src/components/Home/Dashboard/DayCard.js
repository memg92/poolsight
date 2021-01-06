import React from "react";

export default function DayCard({ day, clients }) {
  const weekdays = {
    M: "Monday",
    T: "Tuesday",
    W: "Wednesday",
    R: "Thurday",
    F: "Friday",
  };
  const dayClients = clients.filter((client) => client.service_day === day);

  return (
    <div>
      <div>{weekdays[day]}</div>
      {dayClients.map((client) => {
        return <div>{client.firstname}</div>;
      })}
    </div>
  );
}
