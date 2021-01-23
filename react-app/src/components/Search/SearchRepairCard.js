import React from "react";
import { NavLink } from "react-router-dom";
import { dateFormatter } from "../../services/utils";

export default function SearchRepairCard({ repair }) {
  const clientId = repair.pool.client_id;
  return (
    <NavLink to={`/client/${clientId}`}>
      <div className="flex py-1 px-2 hover:bg-ghost border-2 border-transparent hover:border-gray-200 rounded">
        <div className="font-bold w-44">{repair.title}</div>
        <div className=" w-120">{repair.description}</div>
        <div className="italic w-48">{`Updated: ${dateFormatter(
          repair.updated_at
        )}`}</div>
      </div>
    </NavLink>
  );
}
