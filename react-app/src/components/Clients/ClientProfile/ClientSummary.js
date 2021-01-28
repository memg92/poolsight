import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteClient } from "../../../store/clients";
import EditClientForm from "./EditClientForm";

export default function ClientSummary() {
  const [error, setError] = useState("");
  const [showClientModal, setShowClientModal] = useState(false);
  const history = useHistory();
  const client = useSelector((state) => state.clientAPI.client);
  const dispatch = useDispatch();

  const handleEditClick = (e) => {
    // e.stopPropagation();
    setShowClientModal(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    return dispatch(deleteClient(client.id)).then((res) => {
      if (!res.ok && res.error) {
        return setError(res.error);
      }
      history.push("/");
    });
  };

  return (
    client && (
      <div className="shadow-xl mb-4 mt-10 p-6 text-pnavy text-opacity-90 max-w-4xl w-full">
        <div className="w-full">
          {error && (
            <ul className="mx-auto m-4 p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
              <div className="font-semibold">
                We encountered the following error:
              </div>
              <li className="list-disc list-inside">{error}</li>
            </ul>
          )}
        </div>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-3xl font-semibold">{`${client.firstname} ${client.lastname}`}</h1>
          <div className="flex">
            <div
              className="mx-2 h-7 cursor-pointer"
              title="Edit Client"
              onClick={handleEditClick}
            >
              <i className="fas fa-edit text-xl cursor-pointer"></i>
            </div>
            <div
              className="mx-2 h-7 cursor-pointer"
              title="Delete Client"
              onClick={handleDelete}
            >
              <i className="fas fa-trash text-xl cursor-pointer"></i>
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
              <a
                className="flex items-center pb-2"
                href={`mailto:${client.email}`}
              >
                <i className="fas fa-envelope pr-2"></i>
                <div className="text-sm">{client.email}</div>
              </a>
              <a className="flex items-center" href={`tel:${client.phone}`}>
                <i className="fas fa-phone pr-2"></i>
                <div className="text-sm">{client.phone}</div>
              </a>
            </div>
          </div>
        </div>
        {showClientModal && (
          <EditClientForm
            showClientModal={showClientModal}
            setShowClientModal={setShowClientModal}
          />
        )}
      </div>
    )
  );
}
