import React, { useEffect, useState } from "react";

export default function DayCard({ day, pools }) {
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
  const dateFormatter = (filterDate) => {
    const date = new Date(filterDate);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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

  //handle change in showTable state and listen for clicks to close tbale
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

  const dayPools = pools.filter((client) => client.service_day === day);

  return (
    <div>
      <div
        onClick={openTable}
        className="flex h-12 items-center justify-between cursor-pointer bg-pblue mx-4 my-0.5 shadow-lg hover:bg-opacity-80"
      >
        <div className={"ml-4 text-ghost text-xl w-full"}>
          {weekdays[day][1]}
        </div>
        <i className="fas fa-chevron-circle-down mr-4 text-pnavy"></i>
      </div>
      {showTable && (
        <div className="mx-4">
          <table className="px-4 w-full table-auto my-2 text-pnavy">
            <thead className="text-left text-ghost text-lg bg-pnavy bg-opacity-90">
              <tr>
                <th className="pl-4 py-1 font-normal">First Name</th>
                <th className="font-normal">Last Name</th>
                <th className="font-normal">Street</th>
                <th className="font-normal">City</th>
                <th className="font-normal">Filter Changed</th>
              </tr>
            </thead>
            <tbody>
              {dayPools.map((pool) => {
                return (
                  <tr key={pool.id}>
                    <td className="pl-4">{pool.client.firstname}</td>
                    <td>{pool.client.lastname}</td>
                    <td>{pool.street}</td>
                    <td>{pool.city}</td>
                    <td>{dateFormatter(pool.filter_changed)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
