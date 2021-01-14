import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRepair } from "../../../../store/repairs";
import { dateFormatter } from "../../../../services/utils";
import TaskCard from "../Tasks/TaskCard";
import NewTaskForm from "../Tasks/NewTaskForm";

export default function RepairDetails({ repair }) {
  const [formOpen, setFormOpen] = useState(false);
  const taskState = useSelector((state) => state.taskAPI.clientTasks);
  const tasks = taskState.filter((task) => task.repair_id === repair.id);

  const pools = useSelector((state) => state.poolAPI.clientPools);
  const [pool] = pools.filter((pool) => pool.id === repair.pool_id);

  const toggleForm = (e) => {
    e.stopPropagation();
    if (formOpen) {
      return setFormOpen(false);
    }
    setFormOpen(true);
  };
  return (
    <>
      <div className="container details px-6">
        <div className="container flex items-center py-1 px-2 bg-pnavy bg-opacity-90 text-white rounded">
          <div className="font-medium text-lg pr-2">Pool Address: </div>
          <div>{`${pool.street}, ${pool.city}, ${pool.state}`}</div>
        </div>
        <div className="container px-2 mb-2 rounded-lg">
          <div className="container py-2">
            <div className="font-medium text-lg">Description</div>
            <div>{repair.description}</div>
          </div>
          <div className="container pb-1">
            <table className="w-full text-md table-auto my-1 text-pnavy">
              <thead className="text-left border-b-2 border-pnavy border-opacity-50 bg-pblue bg-opacity-30">
                <tr>
                  <th className="pl-2 font-normal rounded-tl w-28">Tasks</th>
                  <th className="font-normal w-36">Category</th>
                  <th className="font-normal w-64">Description</th>
                  <th className="font-normal w-28 text-center">Rate Charged</th>
                  <th className="font-normal w-16 text-center">Costs</th>
                  <th className="rounded-tr font-normal w-10 text-center">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks && tasks.length ? (
                  tasks.map((task) => {
                    return <TaskCard key={task.id} task={task} />;
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="flex justify-center items-center text-sm font-bold w-40 cursor-pointer hover:bg-pblue hover:bg-opacity-50 transform ease-in-out duration-200 rounded"
            onClick={toggleForm}
          >
            <i
              className={`${formOpen ? "fas fa-minus" : "fas fa-plus"} mr-2 `}
            ></i>
            <span>Add a new task</span>
          </div>
          {formOpen && (
            <NewTaskForm
              key={repair.id}
              repair={repair}
              setFormOpen={setFormOpen}
            />
          )}
        </div>
      </div>
    </>
  );
}
