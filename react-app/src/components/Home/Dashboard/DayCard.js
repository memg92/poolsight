import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { dateFormatter } from "../../../services/utils";

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

  //show client table if today matches the weekday of card
  useEffect(() => {
    let temp = false;
    for (let [key, value] of Object.entries(weekdays)) {
      if (value[0] === today) temp = true;
      if (value[0] === today && key === day) {
        setShowTable(true);
        return;
      }
    }
    if (!temp && day === "M") {
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
        className="flex h-12 items-center justify-between cursor-pointer bg-pblue mx-4 my-0.5 shadow-lg hover:bg-opacity-80 rounded"
      >
        <div className={"ml-4 text-ghost text-xl w-full"}>
          {weekdays[day][1]}
        </div>
        <i className="fas fa-chevron-circle-down mr-4 text-pnavy"></i>
      </div>
      {showTable && (
        <div className="mx-4">
          {dayPools.length ? (
            <table className="px-4 w-full table-auto my-2 text-pnavy">
              <thead className="text-left text-ghost text-lg bg-pnavy bg-opacity-90">
                <tr>
                  <th className="pl-4 py-1 font-normal rounded-l">
                    First Name
                  </th>
                  <th className="font-normal">Last Name</th>
                  <th className="font-normal">Street</th>
                  <th className="font-normal">City</th>
                  <th className="rounded-r font-normal">Filter Changed</th>
                </tr>
              </thead>
              <tbody>
                {dayPools.map((pool) => {
                  return (
                    <tr key={pool.id} className="hover:bg-gray-100 rounded">
                      <td className="pl-4">
                        <Link to={`/client/${pool.client.id}`}>
                          {pool.client.firstname}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/client/${pool.client.id}`}>
                          {pool.client.lastname}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/client/${pool.client.id}`}>
                          {pool.street}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/client/${pool.client.id}`}>
                          {pool.city}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/client/${pool.client.id}`}>
                          {dateFormatter(pool.filter_changed)}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="px-4 py-2">
              <h1 className="text-pnavy mb-2">
                You have no clients for this day.
              </h1>
              <NavLink
                to="/client/create"
                className="text-ghost font-bold p-1 bg-pnavy bg-opacity-80 hover:bg-opacity-90 cursor-pointer rounded"
              >
                Add a client!
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
