import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClientPool } from "../../../../store/pools";
import StateOptions from "../../ClientForm/StateOptions";

export default function NewPoolForm({ formOpen, setFormOpen }) {
  const [errors, setErrors] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("FL");
  const [poolSize, setPoolSize] = useState("");
  const [propertyType, setPropertyType] = useState("Residential");
  const [serviceDay, setServiceDay] = useState("M");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [filterChanged, setFilterChanged] = useState("");
  const client = useSelector((state) => state.clientAPI.client);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    return dispatch(
      createClientPool([
        client.id,
        street,
        city,
        state,
        poolSize,
        propertyType,
        monthlyRate,
        serviceDay,
        filterChanged,
      ])
    ).then((res) => {
      if (!res.ok && res.errors) {
        return setErrors(res.errors);
      }
      setFormOpen(false);
    });
  };

  return (
    <div>
      <div className="w-full">
        {errors && (
          <ul className="mx-auto m-4 p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
            <div className="font-semibold">
              We encountered the following errors:
            </div>
            {Array.isArray(errors) ? (
              errors.map((error, i) => (
                <li className="list-disc list-inside" key={i}>
                  {error}
                </li>
              ))
            ) : (
              <li className="list-disc list-inside">{errors}</li>
            )}
          </ul>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50 w-full mb-4"
      >
        <div className="flex items-center px-4 py-2 w-full">
          <div className="text-lg font-medium mb-0.5">Street:</div>
          <input
            type="text"
            onChange={(e) => setStreet(e.target.value)}
            placeholder="e.g. 1234 Street st."
            value={street}
            className="form-input text-sm ml-1 p-1 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
          <div className="text-lg font-medium mb-0.5 ml-4">City:</div>
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Deerfield"
            value={city}
            className="form-input text-sm ml-1 p-1 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
          <div className="text-lg font-medium mb-0.5 ml-4">State:</div>
          <select
            onChange={(e) => setState(e.target.value)}
            value={state}
            className="form-select text-sm ml-1 p-1 w-20 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          >
            <StateOptions />
          </select>
        </div>
        <div className="flex justify-between px-4 py-3 w-full">
          <div className="flex flex-col w-20 pr-2">
            <div className="font-medium mb-0.5">Size</div>
            <input
              type="number"
              onChange={(e) => setPoolSize(e.target.value)}
              placeholder="sqf"
              value={poolSize}
              className="form-input text-sm border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            />
          </div>
          <div className="flex flex-col pr-2">
            <div className="font-medium mb-0.5">Property Type</div>
            <select
              onChange={(e) => setPropertyType(e.target.value)}
              value={propertyType}
              className="form-select text-sm w-36 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="flex flex-col pr-2">
            <div className="font-medium mb-0.5">Service Day</div>
            <select
              onChange={(e) => setServiceDay(e.target.value)}
              value={serviceDay}
              className="form-select text-sm border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            >
              <option value="M">Monday</option>
              <option value="T">Tuesday</option>
              <option value="W">Wednesday</option>
              <option value="R">Thursday</option>
              <option value="F">Friday</option>
            </select>
          </div>
          <div className="flex flex-col w-28 pr-2">
            <div className="font-medium mb-0.5">Monthly Rate</div>
            <input
              type="number"
              onChange={(e) => setMonthlyRate(e.target.value)}
              placeholder="e.g. 80"
              value={monthlyRate}
              className="form-input text-sm border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            />
          </div>
          <div className="flex flex-col w-44 pr-2">
            <div className="font-medium mb-0.5">Filter Changed</div>
            <input
              type="date"
              onChange={(e) => setFilterChanged(e.target.value)}
              placeholder="mm/dd/yyyy"
              value={filterChanged}
              className="form-input text-sm border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            />
          </div>
        </div>
        <button
          className="mb-2 mx-4 bg-pnavy text-ghost px-6 py-1.5 rounded hover:opacity-90"
          type="submit"
        >
          Add Pool
        </button>
      </form>
    </div>
  );
}
