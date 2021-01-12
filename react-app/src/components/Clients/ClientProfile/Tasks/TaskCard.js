import React from "react";

export default function TaskCard({ task }) {
  return (
    <div>
      <div>{task.title}</div>
      <div>{task.category}</div>
      <div>{task.description}</div>
      <div>{task.rate}</div>
      <div>{task.cost}</div>
    </div>
  );
}
