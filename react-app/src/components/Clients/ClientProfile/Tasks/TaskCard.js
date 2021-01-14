import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../../store/tasks";

export default function TaskCard({ task, setShowTaskModal, setEditTaskId }) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const closeModal = () => {
    setShowTaskModal(false);
    document.removeEventListener("click", closeModal);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditTaskId(task.id);
    setShowTaskModal(true);
    return document.addEventListener("click", closeModal);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteTask(task.id)).then((res) => {
      if (!res.ok && res.error) {
        return setError(res.error);
      }
      return setShowTaskModal(false);
    });
  };

  return (
    <tr className="hover:bg-gray-100 text-sm border-b-2 border-opacity-70 border-gray-100 rounded">
      <td className="pl-2 pr-1 py-1">{task.title}</td>
      <td className="px-1 py-1">{task.category}</td>
      <td className="px-1 py-1">{task.description}</td>
      <td className="px-1 py-1 text-center">{`$${task.rate}`}</td>
      <td className="px-1 py-1 text-center">{`$${task.cost}`}</td>
      <td className="pr-2 pl-1 py-1 text-center">
        <i
          onClick={handleEditClick}
          className="fas fa-edit opacity-50 hover:opacity-100 cursor-pointer"
        ></i>
      </td>
      <td className="pr-2 pl-1 py-1 text-center">
        <i
          onClick={handleDelete}
          className="fas fa-trash opacity-50 hover:opacity-100 cursor-pointer"
        ></i>
      </td>
    </tr>
  );
}
