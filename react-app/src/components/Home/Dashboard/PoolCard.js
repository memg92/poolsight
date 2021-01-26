import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../../services/utils";

export default function PoolCard({ pool }) {
  const [taskPending, setTaskPending] = useState(false);
  const repairs = pool.repairs;
  if (repairs.length && !taskPending) {
    for (let i = 0; i < repairs.length; i++) {
      if (taskPending) return;
      let repair = repairs[i];
      let tasks = repair.tasks;
      for (let j = 0; j < tasks.length; j++) {
        let task = tasks[i];
        if (!task.complete) {
          setTaskPending(true);
          return;
        }
      }
    }
  }
  console.log(taskPending);
  return (
    <tr className="py-1 hover:bg-ghost">
      <td className="pl-4 relative rounded-l">
        <Link to={`/client/${pool.client.id}`}>
          <span
            className={`${
              taskPending
                ? "animate-ping absolute h-2 w-2 top-2 left-0 inline-flex rounded-full bg-red-500 opacity-80"
                : ""
            }`}
          ></span>
          <span
            className={`${
              taskPending
                ? "absolute h-2 w-2 top-2 left-0 inline-flex rounded-full bg-red-700"
                : ""
            }`}
          ></span>
          {`${pool.client.firstname} ${pool.client.lastname}`}
        </Link>
      </td>

      <td>
        <Link to={`/client/${pool.client.id}`}>{pool.street}</Link>
      </td>
      <td>
        <Link to={`/client/${pool.client.id}`}>{pool.city}</Link>
      </td>
      <td className="rounded-r">
        <Link to={`/client/${pool.client.id}`}>
          {dateFormatter(pool.filter_changed)}
        </Link>
      </td>
    </tr>
  );
}
