import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function SearchPage() {
  const { query } = useParams();
  const location = useLocation();
  const data = location.state.data;
  console.log("query", query);
  console.log("data", data);
  return (
    <div className="h-full mb-10">
      <div>{`Search results for ${query}...`}</div>
      <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-4xl">
        <div className="text-3xl font-semibold">Clients</div>
        {data?.pools ? (
          data.pools.map((pool) => {
            return (
              <div key={pool.client.id}>
                {pool.client.firstname}
                {pool.client.lastname}
              </div>
            );
          })
        ) : (
          <div>No clients found...</div>
        )}
      </div>
      <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-4xl">
        <div className="text-3xl font-semibold">Repairs</div>
        {data?.repairs ? (
          data.repairs.map((repair) => {
            return <div key={repair.id}>{repair.title}</div>;
          })
        ) : (
          <div>No repairs found...</div>
        )}
      </div>
    </div>
  );
}
