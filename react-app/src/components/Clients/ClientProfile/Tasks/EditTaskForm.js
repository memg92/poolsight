import React, { useState, useEffect } from "react";
import { editTask } from "../../../../store/tasks";
import { useDispatch } from "react-redux";

export default function EditTaskForm({
  tasks,
  showTaskModal,
  setShowTaskModal,
  editTaskId,
}) {
  const [task] = tasks.filter((task) => task.id === editTaskId);
  console.log("tasks:", tasks);
  console.log("tasks ids:", editTaskId);
  console.log("task and title:", task, task?.title);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(task?.title);
  const [rate, setRate] = useState(task?.rate);
  const [cost, setCost] = useState(task?.cost);
  const [description, setDescription] = useState(task?.description);
  const [pending, setPending] = useState(task?.pending);

  const dispatch = useDispatch();

  useEffect(() => {
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }, [showTaskModal]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    return dispatch(
      editTask(task.id, title, rate, cost, description, pending)
    ).then((res) => {
      if (!res.ok && res.error) {
        return setError(res.error);
      }
      return setShowTaskModal(false);
    });
  };

  return (
    showTaskModal && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="mt-20 mx-auto max-w-xl shadow-lg">
          <div className="modal animate-scale-in-center bg-ghost flex flex-col justify-center rounded-lg px-6 py-4 w-full">
            <form
              className="flex flex-col w-full text-pnavy text-opacity-90"
              onSubmit={handleEditSubmit}
            >
              <h1 className="text-xl font-bold pb-2 mb-2 border-b-2 border-pnavy border-opacity-40">
                Edit Task
              </h1>
              <div className="flex mt-2">
                <div className="flex flex-col w-full mr-1">
                  <div className="">Title</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 "
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mt-2">
                <div className="flex flex-col w-full mr-1">
                  <div className="">Rate charged</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 "
                    type="text"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full ml-1">
                  <div className="">Cost</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center w-full mb-4 ml-1">
                <div className="mr-2">Pending</div>
                <input
                  type="checkbox"
                  className="form-checkbox border-2 border-gray-200text-sm rounded"
                  value={pending}
                  onChange={(e) => setPending(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full ml-1">
                <div className="">Description</div>
                <textarea
                  className="form-textarea text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                className="m-1 max-w-sm self-center w-full bg-pnavy text-ghost py-1.5 rounded hover:opacity-90"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
