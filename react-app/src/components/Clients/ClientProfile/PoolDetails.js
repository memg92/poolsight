import React from "react";
import { dateFormatter } from "../../../services/utils";

export default function PoolDetails({ client }) {
  const weekdays = {
    M: ["Mon", "Monday"],
    T: ["Tue", "Tuesday"],
    W: ["Wed", "Wednesday"],
    R: ["Thu", "Thursday"],
    F: ["Fri", "Friday"],
  };
  return (
    <div className="my-4 p-6 text-pnavy text-opacity-90 w-full max-w-3xl">
      <h1 className="text-2xl font-semibold pb-2">Pool Details</h1>
      <div className="flex border-gray-200 border-2 border-opacity-50 max-w-2xl rounded">
        <div className="px-4 py-2 w-full">
          <div className="text-lg font-medium mb-0.5">Address</div>
          <div className="text-sm pb-2">{`${client.pools.street}`}</div>
          <div className="text-sm pb-2">{`${client.pools.city}, ${client.pools.state}`}</div>
        </div>
        <div className="flex flex-col px-4 py-2 w-full">
          <div className="flex flex-col">
            <div className="text-lg font-medium mb-0.5 pr-2">Property Type</div>
            <div className="text-sm pb-2">{client.pools.property_type}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-medium mb-0.5 pr-2">Service Day</div>
            <div className="text-sm pb-2">
              {weekdays[client.pools.service_day][1]}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 py-2 w-full">
          <div>
            <div className="text-lg font-medium mb-0.5 pr-2">Monthly Rate</div>
            <div className="text-sm pb-2">{`$${client.pools.monthly_rate}`}</div>
            <div className="text-lg font-medium mb-0.5 pr-2">
              Filter Changed
            </div>
            <div className="text-sm pb-2">
              {dateFormatter(client.pools.filter_changed)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
