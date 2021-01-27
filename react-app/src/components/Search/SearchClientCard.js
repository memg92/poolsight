import React from "react";
import { NavLink } from "react-router-dom";
import { dateFormatter } from "../../services/utils";

export default function SearchClientCard({ pool }) {
  const client = pool.client;
  return (
    <NavLink to={`/client/${client.id}`}>
      <div className="flex py-1 px-2 hover:bg-ghost border-2 border-transparent hover:border-gray-200 rounded">
        <div className="font-bold w-44">{`${client.firstname} ${client.lastname}`}</div>
        <div className="w-120">{`${pool.street}, ${pool.city}`}</div>
        <div className="italic w-64">{`Filter Cleaned: ${dateFormatter(
          pool.filter_cleaned
        )}`}</div>
      </div>
    </NavLink>
  );
}
