import React from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { dateFormatter } from "../../../../services/utils";
import { deletePool } from "../../../../store/pools";

export default function PoolDetails({ pool, setPoolDeleted }) {
  const weekdays = {
    M: ["Mon", "Monday"],
    T: ["Tue", "Tuesday"],
    W: ["Wed", "Wednesday"],
    R: ["Thu", "Thursday"],
    F: ["Fri", "Friday"],
  };
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    return dispatch(deletePool(pool.id));
  };

  return (
    <div className="flex flex-col border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50 w-full mb-4">
      <div className="flex justify-between w-full px-4 pt-1  items-center pb-2">
        <div className="flex items-center  ">
          <div className="text-lg font-medium mb-0.5">Address:</div>
          <div className="pl-2">{`${pool.street},`}</div>
          <div className="pl-1">{`${pool.city}, ${pool.state}`}</div>
        </div>
        <i
          onClick={handleDelete}
          className="fas fa-trash opacity-50 hover:opacity-100 cursor-pointer"
        ></i>
      </div>
      <div className="flex justify-between px-4 py-2 w-full">
        <div className="flex flex-col pr-2">
          <div className="w-full font-medium mb-0.5 ">Size</div>
          <div className="text-sm pb-2">{`${pool.pool_size} sqf.`}</div>
        </div>
        <div className="flex flex-col pr-2">
          <div className="w-full font-medium mb-0.5">Property Type</div>
          <div className="text-sm pb-2">{pool.property_type}</div>
        </div>
        <div className="flex flex-col pr-2">
          <div className="w-full font-medium mb-0.5 ">Service Day</div>
          <div className="text-sm pb-2">{weekdays[pool.service_day][1]}</div>
        </div>
        <div className="flex flex-col pr-2">
          <div className="w-full font-medium mb-0.5">Monthly Rate</div>
          <div className="text-sm pb-2">{`$${pool.monthly_rate}`}</div>
        </div>
        <div className="flex flex-col pr-2">
          <div className="w-full font-medium mb-0.5">Filter Changed</div>
          <div className="text-sm pb-2">
            {dateFormatter(pool.filter_changed)}
          </div>
        </div>
      </div>
    </div>
  );
}
