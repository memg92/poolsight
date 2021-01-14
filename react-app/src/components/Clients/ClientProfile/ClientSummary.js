import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteClient } from "../../../store/clients";
import EditClientForm from "./EditClientForm";

export default function ClientSummary({ showClientModal, setShowClientModal }) {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.clientAPI.client);
  const history = useHistory();
  const [error, setError] = useState("");

  const closeModal = () => {
    setShowClientModal(false);
    document.removeEventListener("click", closeModal);
  };

  const handleEditClick = (e) => {
    // e.stopPropagation();
    setShowClientModal(true);
    return document.addEventListener("click", closeModal);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    return dispatch(deleteClient(client.id)).then((res) => {
      if (!res.ok && res.error) {
        return setError(res.error);
      }
    });
  };

  return (
    client && (
      <div className="shadow-xl my-4 p-6 text-pnavy text-opacity-90 max-w-4xl w-full">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-3xl font-semibold">{`${client.firstname} ${client.lastname}`}</h1>
          <button
            className="bg-pnavy text-ghost p-1 rounded hover:opacity-90"
            onClick={handleDelete}
          >
            Delete Client
          </button>
        </div>
        <div className="flex border-gray-200 border-2 border-opacity-50 max-w-3xl rounded">
          <div className="px-4 py-2 w-full">
            <div className="text-lg font-medium mb-0.5">Billing Address</div>
            <div className="">Street</div>
            <div className="text-sm pb-2">{`${client.street}`}</div>
            <div className="">City, State</div>
            <div className="text-sm pb-2">{`${client.city}, ${client.state}`}</div>
          </div>
          <div className="px-4 py-2 w-full">
            <div className="text-lg font-medium mb-0.5">Contact</div>
            <div className="">Email</div>
            <div className="text-sm pb-2">{client.email}</div>
            <div className="">Phone</div>
            <div className="text-sm pb-2">{client.phone}</div>
          </div>
          <div
            className="mx-6 my-2 hover:underline h-7 cursor-pointer"
            onClick={handleEditClick}
          >
            Edit
          </div>
        </div>
        <EditClientForm
          showClientModal={showClientModal}
          setShowClientModal={setShowClientModal}
        />
      </div>
    )
  );
}
