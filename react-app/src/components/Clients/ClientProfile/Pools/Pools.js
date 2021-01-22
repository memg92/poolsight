import React, { useState } from "react";
import NewPoolForm from "./NewPoolForm";
import PoolDetails from "./PoolDetails";
import { useSelector } from "react-redux";

export default function Pools() {
  const [formOpen, setFormOpen] = useState(false);

  const pools = useSelector((state) => state.poolAPI.clientPools);

  const toggleForm = () => {
    if (formOpen) {
      return setFormOpen(false);
    }
    setFormOpen(true);
  };

  return (
    <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-4xl border-b-2 border-gray-100">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-semibold">Pool Details</h1>
        <i
          className={`${
            formOpen ? "fas fa-minus" : "fas fa-plus"
          } text-pnavy cursor-pointer hover:bg-pblue hover:bg-opacity-70 p-0.5 rounded`}
          onClick={toggleForm}
        ></i>
      </div>
      {formOpen && (
        <NewPoolForm formOpen={formOpen} setFormOpen={setFormOpen} />
      )}
      {pools.length ? (
        <div></div>
      ) : (
        <div className={formOpen ? "hidden" : "py-2"}>
          <h1 className="text-pnavy mb-2">
            You have no pools for this client.
          </h1>
          <div
            onClick={toggleForm}
            className="text-ghost font-bold p-1 w-28 text-center bg-pnavy bg-opacity-80 hover:bg-opacity-90 cursor-pointer rounded"
          >
            Add a pool!
          </div>
        </div>
      )}
      {pools.map((pool) => {
        return <PoolDetails key={pool.id} pool={pool} />;
      })}
    </div>
  );
}
