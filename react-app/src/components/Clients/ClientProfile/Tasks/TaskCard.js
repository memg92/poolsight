import React from "react";

export default function TaskCard({ task }) {
  return (
    <tr className="hover:bg-gray-100 text-sm rounded">
      <td className="pl-2 pr-1">{task.title}</td>
      <td className="px-1">{task.category}</td>
      <td className="px-1">{task.description}</td>
      <td className="px-1">{`$${task.rate}`}</td>
      <td className="pr-2 pl-1">{`$${task.cost}`}</td>
    </tr>
  );
}
