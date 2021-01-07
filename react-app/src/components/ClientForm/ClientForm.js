import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addClient } from "../../store/clients";
import StateOptions from "./StateOptions";

export default function ClientForm() {
  const [errors, setErrors] = useState([]);
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
    return dispatch(addClient(clientDetails)).catch((res) => {
      if (res.client && res.client.errors) {
        console.log(res.client.errors);
        return setErrors(res.client.errors);
      }
      return history.push("/");
    });
  };

  return (
    <div className="flex  bg-ghost justify-center mx-auto w-full px-4">
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
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
