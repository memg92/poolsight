import React, { useState } from "react";

export default function EditTaskForm({ index, task, tasks, setTasks }) {
  // const repairs = useSelector((state) => state.repairAPI.repairs);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(repair.title);
  const [description, setDescription] = useState(repair.description);
  const [tasks, setTasks] = useState(repair.tasks);
  let newTasks = [...tasks];
  console.log(newTasks);
  return (
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
      <div className="flex flex-col w-full ml-1">
        <div className="">Description</div>
        <input
          className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
