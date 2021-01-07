import React, { useEffect, useState } from "react";

export default function DayCard({ day, clients }) {
  const [showTable, setShowTable] = useState(false);
  const weekdays = {
    M: ["Mon", "Monday"],
    T: ["Tue", "Tuesday"],
    W: ["Wed", "Wednesday"],
    R: ["Thu", "Thursday"],
    F: ["Fri", "Friday"],
  };
  const date = new Date();
  const today = date.toLocaleDateString("en-US", { weekday: "short" });

  //show client table if today matches the weekday of card
  useEffect(() => {
    if (today === weekdays[day][0] && !showTable) {
      setShowTable(true);
    } else if (today > 4 && day === "M") {
      setShowTable(true);
    }
  }, []);

  const openTable = () => {
    if (showTable) {
      setShowTable(false);
    }
    setShowTable(true);
  };

  useEffect(() => {
    if (!showTable) return;

    const closeTable = () => {
      setShowTable(false);
    };

    //listen for click to close table
    document.addEventListener("click", closeTable);

    //stop propagation at the table level
    const table = document.querySelector("table") || null;
    if (table) {
      table.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    //remove listener so that card can be reopened after
    return () => {
      document.removeEventListener("click", closeTable);
    };
  }, [showTable]);

  const dayClients = clients.filter((client) => client.service_day === day);

  return (
    <div>
      <div className="flex items-center justify-between bg-pblue">
        <div
          onClick={openTable}
          className={"cursor-pointer text-ghost h-10 w-full"}
        >
          {weekdays[day][1]}
        </div>
        <button className=""> button</button>
      </div>
      {showTable && (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Street</th>
              <th>City</th>
              <th>Filter Changed</th>
            </tr>
          </thead>
          <tbody>
            {dayClients.map((client) => {
              return (
                <tr key={client.id}>
                  <td>{client.firstname}</td>
                  <td>{client.lastname}</td>
                  <td>{client.street}</td>
                  <td>{client.city}</td>
                  <td>{client.filter_changed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
