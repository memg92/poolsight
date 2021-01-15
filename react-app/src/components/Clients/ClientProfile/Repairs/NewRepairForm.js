import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClientRepair } from "../../../../store/repairs";
import ErrorHandler from "../../../Errors/ErrorHandler";
import MultiErrorHandler from "../../../Errors/MultiErrorHandler";

export default function NewRepairForm({ formOpen, setFormOpen }) {
  const pools = useSelector((state) => state.poolAPI.clientPools);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [poolId, setPoolId] = useState(pools[0].id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    return dispatch(createClientRepair([poolId, title, description])).then(
      (res) => {
        if (!res.ok && res.error) {
          return setError(res.error);
        } else if (!res.ok && res.errors) {
          return setErrors(res.errors);
        }
        setFormOpen(false);
      }
    );
  };

  return (
    <>
      <div className="w-full">
        {error && <ErrorHandler error={error} />}
        {errors && <MultiErrorHandler errors={errors} />}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50
      mb-4"
      >
        <div className="flex px-4 py-2 w-full">
          <div className="text-lg  w-36 font-medium mb-0.5">Pool Address:</div>
          <select
            onChange={(e) => setPoolId(e.target.value)}
            placeholder="e.g. 1234 title st."
            value={poolId}
            className="form-select w-full text-sm ml-1 p-1 border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          >
            {pools.map((pool) => {
              return (
                <option
                  key={pool.id}
                  value={pool.id}
                >{`${pool.street}, ${pool.city}, ${pool.state}`}</option>
              );
            })}
          </select>
        </div>
        <div className="flex px-4 py-2 w-full">
          <div className="text-lg w-36 font-medium mb-0.5">Title:</div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Insert Repair Title"
            value={title}
            className="form-input text-sm ml-1 p-1 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
        </div>
        <div className="flex px-4 py-2 w-full">
          <div className="text-lg w-36 font-medium mb-0.5">Description:</div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Insert Repair Description"
            value={description}
            className="form-textarea text-sm ml-1 p-1 w-full border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 rounded"
          />
        </div>

        <button
          className="mb-2 mx-4 w-36 self-center bg-pnavy text-white px-6 py-1.5 rounded hover:opacity-90"
          type="submit"
        >
          Add Repair
        </button>
      </form>
    </>
  );
}
