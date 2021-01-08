import React from "react";

export default function ClientSummary({ client }) {
  return (
    <div className="shadow-xl my-4 p-6 text-pnavy text-opacity-90">
      <h1 className="text-2xl font-semibold pb-2">{`${client.firstname} ${client.lastname}`}</h1>
      <div className="flex border-gray-200 border-2 border-opacity-50 max-w-2xl rounded">
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
        <div className="mx-6 my-2 hover:underline h-7">Edit</div>
      </div>
    </div>
  );
}
