import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRepair } from "../../../../store/repairs";
import { dateFormatter } from "../../../../services/utils";
import TaskCard from "../Tasks/TaskCard";
import NewTaskForm from "../Tasks/NewTaskForm";

export default function RepairDetails({ repair }) {
  const [formOpen, setFormOpen] = useState(false);
  const tasks = repair.tasks;
  const pools = useSelector((state) => state.poolAPI.clientPools);
  const [pool] = pools.filter((pool) => pool.id === repair.pool_id);

  const toggleForm = () => {
    if (formOpen) {
      return setFormOpen(false);
    }
    setFormOpen(true);
  };
  return (
    <div className="container details px-6">
      <div className="container flex pt-2">
        <div className="font-medium text-lg pr-2">Pool Address: </div>
        <div>{`${pool.street}, ${pool.city}, ${pool.state}`}</div>
      </div>
      <div className="container border-2 border-pnavy border-opacity-10 px-2 mb-2 rounded-lg">
        <div className="container pb-2">
          <div className="font-medium text-lg">Description</div>
          <div>{repair.description}</div>
        </div>
        <div className="container pb-2">
          <div className="font-medium text-lg">Tasks</div>
          {tasks && tasks.length ? (
            tasks.map((task) => {
              return <TaskCard task={task} />;
            })
          ) : (
            <div></div>
          )}
          <div onClick={toggleForm} className="cursor-pointer">
            Add a new task
          </div>
        </div>
        {formOpen && <NewTaskForm pool={pool} setFormOpen={setFormOpen} />}
      </div>
    </div>
  );
}
