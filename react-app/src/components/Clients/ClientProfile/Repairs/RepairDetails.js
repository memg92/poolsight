import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../Tasks/TaskCard";
import NewTaskForm from "../Tasks/NewTaskForm";
import EditTaskForm from "../Tasks/EditTaskForm";

export default function RepairDetails({ repair, setShowDetails }) {
  const [formOpen, setFormOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const taskState = useSelector((state) => state.taskAPI.clientTasks);
  const tasks = taskState.filter((task) => task.repair_id === repair.id);
  const [editTaskId, setEditTaskId] = useState(null);

  const pools = useSelector((state) => state.poolAPI.clientPools);
  const [pool] = pools.filter((pool) => pool.id === repair.pool_id);

  const toggleForm = (e) => {
    e.stopPropagation();
    if (formOpen) {
      return setFormOpen(false);
    }
    setFormOpen(true);
  };

  return pool ? (
    <>
      <div className="details  animate-scale-in-ver-top px-6 w-full">
        <div className="flex items-center py-1 px-2 bg-pnavy bg-opacity-90 text-white rounded">
          <div className="font-medium text-lg pr-2">Pool Address: </div>
          <div>{`${pool.street}, ${pool.city}, ${pool.state}`}</div>
        </div>
        <div className="px-2 mb-2 rounded-lg">
          <div className="pt-2 pb-4">
            <div className="font-medium text-lg">Description</div>
            <div>{repair.description}</div>
          </div>
          <div className="pb-1">
            <table className="w-full text-md table-auto my-1 text-pnavy">
              <thead className="text-left border-b-2 border-pnavy border-opacity-50 bg-pblue bg-opacity-30">
                <tr>
                  <th className="pl-2 font-normal rounded-tl w-32">Tasks</th>
                  <th className="font-normal w-64">Description</th>
                  <th className="font-normal w-16 text-center">Rate</th>
                  <th className="font-normal w-16 text-center">Costs</th>
                  <th className="font-normal w-16 text-center">Complete</th>
                  <th className="font-normal w-10 text-center">Edit</th>
                  <th className="rounded-tr font-normal w-10 text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks && tasks.length ? (
                  tasks.map((task) => {
                    return (
                      <TaskCard
                        key={task.id}
                        task={task}
                        setShowTaskModal={setShowTaskModal}
                        setEditTaskId={setEditTaskId}
                      />
                    );
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="flex py-1 justify-center items-center text-sm font-bold w-40 cursor-pointer hover:bg-pnavy hover:text-ghost hover:bg-opacity-90 transition-all ease-in-out duration-300 rounded"
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
      {showTaskModal && (
        <EditTaskForm
          tasks={tasks}
          showTaskModal={showTaskModal}
          setShowTaskModal={setShowTaskModal}
          editTaskId={editTaskId}
        />
      )}
    </>
  ) : (
    <></>
  );
}
