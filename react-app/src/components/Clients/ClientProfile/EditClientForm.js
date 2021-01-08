import React, { useState } from "react";

export default function EditClientForm({ client, editForm, setEditForm }) {
  const [firstname, setFirstname] = useState(client.firstname);
  const [laststname, setLaststname] = useState(client.laststname);
  const [street, setStreet] = useState(client.street);
  const [city, setCity] = useState(client.city);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);

  return (
    <div className="shadow-xl my-4 p-6 text-pnavy text-opacity-90">
      <h1 className="text-2xl font-semibold pb-2">{`${client.firstname} ${client.lastname}`}</h1>
      <form
        className="flex border-gray-200 border-2 border-opacity-50 max-w-2xl rounded"
        onClick={handleEditSubmit}
      >
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
        <div>
          <button className="mx-6 my-2 bg-pnavy hover:bg-opacity-50 h-7">
            Edit Client
          </button>
          <button
            className="mx-6 my-2 bg-pnavy hover:bg-opacity-50 h-7"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
