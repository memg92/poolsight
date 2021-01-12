import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createClientTask } from "../../../../store/tasks";

export default function NewTaskForm({ pool, setFormOpen }) {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [rate, setRate] = useState(0);
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    return dispatch(
      createClientTask([pool.id, title, category, rate, cost, description])
    ).then((res) => {
      if (!res.ok && res.error) {
        setError(res.error);
      }
      setFormOpen(false);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50
      mb-4"
    >
      <div className="flex px-4 py-2 w-full">
        <div className="flex flex-col">
          <div className="text-lg w-36 font-medium mb-0.5">Title:</div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Insert Task Title"
            value={title}
            className="form-input text-sm ml-1 p-1 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
          <div className="text-lg w-36 font-medium mb-0.5">Category:</div>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Insert Task Category"
            value={category}
            className="form-input text-sm ml-1 p-1 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-lg w-36 font-medium mb-0.5">Rate Charged:</div>
          <input
            type="number"
            min="0"
            onChange={(e) => setRate(e.target.value)}
            placeholder="Insert Task Rate Charged"
            value={rate}
            className="form-input text-sm ml-1 p-1 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
          <div className="text-lg w-36 font-medium mb-0.5">Cost:</div>
          <input
            type="number"
            min="0"
            onChange={(e) => setCost(e.target.value)}
            placeholder="Insert Task Cost Charged"
            value={cost}
            className="form-input text-sm ml-1 p-1 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
        </div>
      </div>
      <div className="flex px-4 py-2 w-full">
        <div className="text-lg w-36 font-medium mb-0.5">Description:</div>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Insert Task Description"
          value={description}
          className="form-textarea text-sm ml-1 p-1 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
        />
      </div>
      <button
        className="mb-2 mx-4 w-36 self-center bg-pnavy text-white px-6 py-1.5 rounded hover:opacity-90"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
}
