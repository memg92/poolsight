import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addClient } from "../../store/clients";
import StateOptions from "./StateOptions";

export default function ClientForm() {
  const [errors, setErrors] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const clientDetails = [
    firstName,
    lastName,
    street,
    city,
    state,
    email,
    phone,
  ];

  const createClient = async (e) => {
    e.preventDefault();
    return dispatch(addClient(clientDetails)).then((res) => {
      if (!res.ok && res.errors) {
        // console.log(res.errors);
        return setErrors(res.errors);
      }
      return history.push("/");
    });
  };

  return (
    <div className="flex  bg-ghost justify-center mx-auto w-full px-4">
      <div>
        {errors && (
          <ul className="mx-auto p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
            <div className="font-semibold">
              Please correct the following errors:
            </div>
            {errors.map((error, i) => (
              <li className="list-disc list-inside" key={i}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <form
        onSubmit={createClient}
        className="flex flex-col max-w-lg w-full h-auto my-20 shadow-lg justify-center bg-white"
      >
        <div className="p-3">New Client</div>
        <div className="flex">
          <input
            className="form-input mx-4 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            className="form-input w-full mr-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <input
          className="form-input mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          type="text"
          placeholder="Street Address"
          onChange={(e) => setStreet(e.target.value)}
          value={street}
        />
        <div className="flex">
          <input
            className="form-input w-full mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <select
            className="form-select w-36 mr-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
            value={state}
          >
            <StateOptions />
          </select>
        </div>
        <div className="flex">
          <input
            className="form-input w-full mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <input
            className="form-input w-full mr-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex">
          <input
            className="form-input w-full mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="number"
            placeholder="Pool Size (sqf)"
            onChange={(e) => setPoolSize(e.target.value)}
            value={poolSize}
          />
          <select
            className="form-select mr-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50  border-2 border-opacity-50 rounded"
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value);
            }}
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div className="flex">
          <input
            className="form-input w-full mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="number"
            placeholder="Monthly Rate ($USD)"
            onChange={(e) => setMonthlyRate(e.target.value)}
            value={monthlyRate}
          />
          <select
            className="form-select w-full mr-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50  border-2 border-opacity-50 rounded"
            value={serviceDay}
            onChange={(e) => setServiceDay(e.target.value)}
          >
            <option value="M">Monday</option>
            <option value="T">Tuesday</option>
            <option value="W">Wednesday</option>
            <option value="R">Thursday</option>
            <option value="F">Friday</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="w-full ml-4 pl-4 pt-4">
            Date Filter Last Changed:
          </span>
          <input
            className="form-input w-full mr-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="date"
            placeholder="MM/DD/YYYY (Optional)"
            onChange={(e) => setFilterChanged(e.target.value)}
            value={filterChanged}
          />
        </div>

        <button
          className="m-3 mx-4 bg-pnavy text-ghost py-1.5 rounded hover:opacity-90"
          type="submit"
        >
          Submit New Client
        </button>
      </form>
    </div>
  );
}
