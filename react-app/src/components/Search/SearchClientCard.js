import React from "react";
import { NavLink } from "react-router-dom";
import { dateFormatter } from "../../services/utils";

export default function SearchClientCard({ pool }) {
  const client = pool.client;
  return (
    <NavLink to={`/client/${client.id}`}>
      <div className="flex pb-1 px-4 hover:bg-ghost rounded">
        <div className="font-bold w-44">{`${client.firstname} ${client.lastname}`}</div>
        <div className="w-96">{`${pool.street}, ${pool.city}`}</div>
        <div className="italic w-64">{`Filter Changed: ${dateFormatter(
          pool.filter_changed
        )}`}</div>
      </div>
    </NavLink>
  );
}
