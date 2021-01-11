import React from "react";
import { useDispatch } from "react-redux";
import { deleteRepair } from "../../../../store/repairs";
import { dateFormatter } from "../../../../services/utils";

export default function RepairDetails({ repair }) {
  const tasks = repair.tasks;

  return (
    <div className="container">
      <div>
        <div>Description</div>
        <div>{repair.description}</div>
      </div>
      <div>
        <div>Tasks</div>
        {tasks.length &&
          tasks.map((task) => {
            return (
              <div>
                <div>{task.title}</div>
                <div>{task.category}</div>
                <div>{task.description}</div>
                <div>{task.rate}</div>
                <div>{task.cost}</div>
              </div>
            );
          })}
        <div>Add a new task</div>
      </div>
    </div>
  );
}
