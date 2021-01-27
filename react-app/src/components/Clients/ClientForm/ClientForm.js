import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClient, deleteClient } from "../../../store/clients";
import StateOptions from "./StateOptions";
import { createClientPool } from "../../../store/pools";
import MultiErrorHandler from "../../Errors/MultiErrorHandler";

export default function ClientForm() {
  const [errors, setErrors] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("FL");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [poolStreet, setPoolStreet] = useState("");
  const [poolCity, setPoolCity] = useState("");
  const [poolState, setPoolState] = useState("FL");
  const [poolSize, setPoolSize] = useState("");
  const [propertyType, setPropertyType] = useState("Residential");
  const [serviceDay, setServiceDay] = useState("M");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [filterCleaned, setFilterCleaned] = useState("");
  const [checked, setChecked] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const createClient = async (e) => {
    e.preventDefault();
    let clientId;

    return dispatch(
      addClient([firstname, lastname, street, city, state, phone, email])
    ).then((res) => {
      if (!res.ok && res.errors) {
        return setErrors(res.errors);
      } else {
        clientId = res.id;
        return dispatch(
          createClientPool([
            clientId,
            poolStreet,
            poolCity,
            poolState,
            poolSize,
            propertyType,
            monthlyRate,
            serviceDay,
            filterCleaned,
          ])
        ).then((res) => {
          if (!res.ok && res.errors) {
            dispatch(deleteClient(clientId));
            return setErrors(res.errors);
          }
          return history.push("/");
        });
      }
    });
  };

  const handleCheck = (e) => {
    if (checked) {
      setPoolStreet("");
      setPoolCity("");
      setPoolState("");
      return setChecked(false);
    } else {
      setChecked(true);
      setPoolStreet(street);
      setPoolCity(city);
      setPoolState(state);
    }
  };

  return (
    <div className="flex flex-col bg-ghost items-center mx-auto w-full px-4 pb-10">
      <div className="mt-10 max-w-lg w-full">
        {errors && <MultiErrorHandler errors={errors} />}
      </div>
      <form
        onSubmit={createClient}
        className="flex flex-col max-w-lg w-full shadow-lg justify-center bg-white"
      >
        <div className="p-3 text-2xl">New Client</div>
        <div className="flex">
          <input
            className="form-input mx-4 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
          <input
            className="form-input w-full mr-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            name="firstname"
            placeholder="Last Name"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </div>
        <input
          className="form-input mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          type="text"
          placeholder="Billing Street Address"
          name="street"
          onChange={(e) => setStreet(e.target.value)}
          value={street}
        />
        <div className="flex">
          <input
            className="form-input w-full mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            placeholder="City"
            name="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <select
            className="form-select w-36 mr-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="text"
            placeholder="State"
            name="state"
            onChange={(e) => setState(e.target.value)}
            value={state}
          >
            <StateOptions />
          </select>
        </div>
        <div className="flex border-b-2 pb-6 mb-2">
          <input
            className="form-input w-full mx-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="number"
            placeholder="Phone Number"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <input
            className="form-input w-full mr-4 mt-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <h1 className="p-3 text-2xl">Pool Details</h1>
        <div className="flex flex-col justify-center px-4 w-full">
          <input
            type="text"
            name="poolStreet"
            onChange={(e) => setPoolStreet(e.target.value)}
            placeholder="Street Address"
            value={checked ? street : poolStreet}
            className="form-input border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
          <div className="flex items-center p-1">
            <input
              type="checkbox"
              onChange={handleCheck}
              className="form-checkbox border-2 border-gray-200"
            />
            <label className="text-sm ml-1">Same as billing address</label>
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              name="poolCity"
              onChange={(e) => setPoolCity(e.target.value)}
              placeholder="City"
              value={checked ? city : poolCity}
              className="form-input mr-4 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            />
            <select
              name="poolState"
              onChange={(e) => setPoolState(e.target.value)}
              value={checked ? state : poolState}
              className="form-select w-36 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            >
              <StateOptions />
            </select>
          </div>
        </div>
        <div className="flex mx-4 mt-4">
          <input
            type="number"
            onChange={(e) => setPoolSize(e.target.value)}
            placeholder="Pool Size (sqf)"
            name="poolSize"
            value={poolSize}
            className="form-input w-full mr-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />

          <select
            onChange={(e) => setPropertyType(e.target.value)}
            name="poolPropType"
            value={propertyType}
            className="form-select w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div className="flex mx-4 mt-4 justify-between items-center">
          <div className="font-medium mr-1">Service Day</div>
          <select
            onChange={(e) => setServiceDay(e.target.value)}
            name="serviceDay"
            value={serviceDay}
            className="form-select mr-4 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          >
            <option value="M">Monday</option>
            <option value="T">Tuesday</option>
            <option value="W">Wednesday</option>
            <option value="R">Thursday</option>
            <option value="F">Friday</option>
          </select>
          <div className="flex py-2 items-center">
            <div className="font-medium mr-1">Monthly Rate</div>
            <input
              type="number"
              onChange={(e) => setMonthlyRate(e.target.value)}
              placeholder="e.g. 80"
              name="monthlyRate"
              value={monthlyRate}
              className="form-input w-28 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
            />
          </div>
        </div>
        <div className="flex items-center mx-4 mt-4">
          <div className="font-medium w-60 mr-1">Date Filter Cleaned</div>
          <input
            type="date"
            onChange={(e) => setFilterCleaned(e.target.value)}
            placeholder="mm/dd/yyyy"
            name="filterCleaned"
            value={filterCleaned}
            className="form-input w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
        </div>
        <button
          className="m-4 mx-4 self-center p-2 bg-pnavy text-ghost py-1.5 rounded hover:opacity-90"
          type="submit"
        >
          Submit New Client
        </button>
      </form>
    </div>
  );
}
