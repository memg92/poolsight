import React from "react";
import { useParams, useLocation } from "react-router-dom";
import SearchClientCard from "./SearchClientCard";

export default function SearchPage() {
  const { query } = useParams();
  const location = useLocation();
  const data = location.state.data;
  // console.log("query", query);
  // console.log("data", data);
  return (
    <div className="h-full mb-10 mx-auto max-w-4xl">
      <div className="p-2 mt-6 mb-2 text-3xl text-pnavy font-bold ">{`Search results for "${query.replace(
        /[+]/g,
        " "
      )}"`}</div>
      <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full border-b-2 border-gray-200">
        <div className="text-3xl font-semibold p-2 mb-2 shadow-md rounded-lg">
          Clients
        </div>
        {data?.pools ? (
          data.pools.map((pool) => {
            return <SearchClientCard key={pool.id} pool={pool} />;
          })
        ) : (
          <div className="px-2">No clients found...</div>
        )}
      </div>
      <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full ">
        <div className="text-3xl font-semibold p-2 mb-2 shadow-md rounded-lg">
          Repairs
        </div>
        {data?.repairs ? (
          data.repairs.map((repair) => {
            return <div key={repair.id}>{repair.title}</div>;
          })
        ) : (
          <div className="px-2">No repairs found...</div>
        )}
      </div>
    </div>
  );
}
