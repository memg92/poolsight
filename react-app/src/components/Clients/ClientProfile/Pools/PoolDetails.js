import React from "react";
import { dateFormatter } from "../../../../services/utils";

export default function PoolDetails({ pool }) {
  const weekdays = {
    M: ["Mon", "Monday"],
    T: ["Tue", "Tuesday"],
    W: ["Wed", "Wednesday"],
    R: ["Thu", "Thursday"],
    F: ["Fri", "Friday"],
  };
  console.log("pool", pool);
  return (
    <div className="flex flex-col border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50 w-full mb-4">
      <div className="flex  items-center px-4 pt-1 pb-2 w-full">
        <div className="text-lg font-medium mb-0.5">Address:</div>
        <div className="pl-2">{`${pool.street},`}</div>
        <div className="pl-1">{`${pool.city}, ${pool.state}`}</div>
      </div>
      <div className="flex">
        <div className="flex flex-col  px-4 w-full">
          <div className="w-full font-medium mb-0.5 pr-2">Property Type</div>
          <div className="text-sm pb-2">{pool.property_type}</div>
        </div>
        <div className="flex flex-col  px-4 w-full">
          <div className="w-full font-medium mb-0.5 pr-2">Service Day</div>
          <div className="text-sm pb-2">{weekdays[pool.service_day][1]}</div>
        </div>
        <div className="flex flex-col px-4 w-full">
          <div className="w-full font-medium mb-0.5 pr-2">Monthly Rate</div>
          <div className="text-sm pb-2">{`$${pool.monthly_rate}`}</div>
        </div>
        <div className="flex flex-col px-4 w-full">
          <div className="w-full font-medium mb-0.5 pr-2">Filter Changed</div>
          <div className="text-sm pb-2">
            {dateFormatter(pool.filter_changed)}
          </div>
        </div>
      </div>
    </div>
  );
}
