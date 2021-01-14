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
          <div className="flex">
            <div
              className="mx-2 hover:underline h-7 cursor-pointer"
              title="Edit Client"
              onClick={handleEditClick}
            >
              <i className="fas fa-edit text-xl opacity-50 hover:opacity-100 cursor-pointer"></i>
            </div>
            <div
              className="mx-2 hover:underline h-7 cursor-pointer"
              title="Delete Client"
              onClick={handleDelete}
            >
              <i className="fas fa-trash text-xl opacity-50 hover:opacity-100 cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div className="flex max-w-3xl">
          <div className="px-4 py-2 w-full">
            <div className="text-lg font-medium mb-0.5">Billing Address</div>
            <div className="text-sm pb-2">{`${client.street}, ${client.city}, ${client.state}`}</div>
          </div>
          <div className="flex flex-col px-4 py-2 w-full">
            <div className="text-lg font-medium mb-0.5">Contact</div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-envelope pr-2"></i>
                <div className="text-sm">{client.email}</div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone pr-2"></i>
                <div className="text-sm">{client.phone}</div>
              </div>
            </div>
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
