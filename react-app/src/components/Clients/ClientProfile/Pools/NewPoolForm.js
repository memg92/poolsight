import React, { useState } from "react";
import StateOptions from "../../ClientForm/StateOptions";

export default function NewPoolForm({ formOpen, setFormOpen }) {
  const [errors, setErrors] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("FL");
  const [propertyType, setPropertyType] = useState("");
  const [serviceDay, setServiceDay] = useState("");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [filterChanged, setFilterChanged] = useState("");

  return (
    <div className="flex flex-col items-center border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50 w-full mb-4">
      <div className="flex items-center px-4 pt-2 pb-2 w-full">
        <div className="text-lg font-medium mb-0.5">Street:</div>
        <input
          type="text"
          onChange={(e) => setStreet(e.target.value)}
          className="form-input ml-1 p-1 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
        />
        <div className="text-lg font-medium mb-0.5 ml-4">City:</div>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          className="form-input ml-1 p-1 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
        />
        <div className="text-lg font-medium mb-0.5 ml-4">State:</div>
        <select
          onChange={(e) => setState(e.target.value)}
          className="form-select ml-1 p-1 w-20 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
        >
          <StateOptions />
        </select>
      </div>
      <div className="flex justify-start pb-3">
        <div className="flex flex-col w-full">
          <div className="w-full font-medium mb-0.5 pr-2">Property Type</div>
          <select
            onChange={(e) => setPropertyType(e.target.value)}
            className="form-select text-sm w-36 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div className="flex flex-col  w-full">
          <div className="w-full font-medium mb-0.5 pr-2">Service Day</div>
          <select
            onChange={(e) => setServiceDay(e.target.value)}
            className="form-select text-sm border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          >
            <option value="M">Monday</option>
            <option value="T">Tuesday</option>
            <option value="W">Wednesday</option>
            <option value="R">Thursday</option>
            <option value="F">Friday</option>
          </select>
        </div>
        <div className="flex flex-col items-center pl-4 w-full">
          <div className="w-full font-medium mb-0.5">Monthly Rate</div>
          <input
            type="number"
            onChange={(e) => setMonthlyRate(e.target.value)}
            className="form-input text-sm w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
        </div>
        <div className="flex flex-col w-auto px-4">
          <div className="w-full font-medium mb-0.5 pr-2">Filter Changed</div>
          <input
            type="date"
            onChange={(e) => setFilterChanged(e.target.value)}
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
    </div>
  );
}
