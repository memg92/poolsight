import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRepair } from "../../../../store/repairs";
import { dateFormatter } from "../../../../services/utils";
import TaskCard from "./TaskCard";

export default function RepairDetails({ repair }) {
  const tasks = repair.tasks;
  const pools = useSelector((state) => state.poolAPI.clientPools);
  // console.log(pools);
  const [pool] = pools.filter((pool) => pool.id === repair.pool_id);

  return (
    <div className="container details px-6">
      <div className="container flex">
        <div className="font-medium text-lg pr-2">Pool Address: </div>
        <div>{`${pool.street}, ${pool.city}, ${pool.state}`}</div>
      </div>
      <div className="container border-2 px-2 mb-2 bg-ghost">
        <div className="container pb-2">
          <div className="font-medium text-lg">Description</div>
          <div>{repair.description}</div>
        </div>
        <div className="container pb-2">
          <div className="font-medium text-lg">Tasks</div>
          {tasks.length ? (
            tasks.map((task) => {
              return <TaskCard task={task} />;
            })
          ) : (
            <div>Add a new task</div>
          )}
        </div>
      </div>
    </div>
  );
}
