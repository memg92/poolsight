import React from "react";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../../services/utils";

export default function PoolCard({ pool }) {
  return (
    <tr className="py-1 hover:bg-ghost rounded">
      <td className="pl-4">
        <Link to={`/client/${pool.client.id}`}>{pool.client.firstname}</Link>
      </td>
      <td>
        <Link to={`/client/${pool.client.id}`}>{pool.client.lastname}</Link>
      </td>
      <td>
        <Link to={`/client/${pool.client.id}`}>{pool.street}</Link>
      </td>
      <td>
        <Link to={`/client/${pool.client.id}`}>{pool.city}</Link>
      </td>
      <td>
        <Link to={`/client/${pool.client.id}`}>
          {dateFormatter(pool.filter_changed)}
        </Link>
      </td>
    </tr>
  );
}
