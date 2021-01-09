import React, { useState } from "react";
import NewPoolForm from "./NewPoolForm";
import PoolDetails from "./PoolDetails";

export default function Pools({ pools }) {
  const [formOpen, setFormOpen] = useState(false);
  const toggleForm = () => {
    if (formOpen) {
      return setFormOpen(false);
    }
    setFormOpen(true);
  };
  return (
    <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-3xl border-b-2 border-gray-100">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-2xl font-semibold">Pool Details</h1>
        <i
          className={`${
            formOpen ? "fas fa-minus" : "fas fa-plus"
          } text-pnavy cursor-pointer hover:bg-pnavy hover:bg-opacity-30 p-0.5 rounded`}
          onClick={toggleForm}
        ></i>
      </div>
      {!formOpen && (
        <NewPoolForm formOpen={formOpen} setFormOpen={setFormOpen} />
      )}
      {Array.isArray(pools) ? (
        pools.map((pool) => {
          return <PoolDetails key={pool.id} pool={pool} />;
        })
      ) : (
        <PoolDetails key={pools.id} pool={pools} />
      )}
    </div>
  );
}
