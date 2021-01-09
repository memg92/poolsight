import React from "react";
import PoolDetails from "./PoolDetails";

export default function Pools({ pools }) {
  return (
    <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-3xl border-b-2 border-gray-100">
      <h1 className="text-2xl font-semibold pb-2">Pool Details</h1>
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
