import React, { useEffect, useState } from "react";

export default function DayCard({ day, clients }) {
  const [showTable, setShowTable] = useState(false);
  const weekdays = {
    M: [0, "Monday"],
    T: [1, "Tuesday"],
    W: [2, "Wednesday"],
    R: [3, "Thursday"],
    F: [4, "Friday"],
  };
  const date = new Date();
  const today = date.getDay();
  useEffect(() => {
    if (today === weekdays[day][0] && !showTable) {
      setShowTable(true);
    } else if (today > 4 && day === "M") {
      setShowTable(true);
    }
  }, []);
  // console.log(today, weekdays[])
  const toggleTable = (e) => {
    const current = e.currentTarget;
    console.dir(current);
    console.log(current.childNodes, current.childNodes.length);
    console.log(current.classList);
    if (current.childNodes.length > 1) {
      current.childNodes[1].classList.remove("visible");
      current.childNodes[1].classList.add("hidden");
    }
  };

  const openTable = () => {
    if (showTable) {
      return setShowTable(false);
    }
    setShowTable(true);
  };

  useEffect(() => {
    if (!showTable) return;

    const closeTable = () => {
      setShowTable(false);
    };

    document.addEventListener("click", closeTable);

    return () => document.removeEventListener("click", closeTable);
  }, [showTable]);

  const dayClients = clients.filter((client) => client.service_day === day);
  // console.log(dayClients);
  // className={`${day} ${showTable ? "visible" : "hidden"}`}
  return (
    <div onClick={openTable} className={`${day} cursor-pointer`}>
      <div>{weekdays[day][1]}</div>
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
