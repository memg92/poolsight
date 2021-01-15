import React from "react";

export default function LoadingPools() {
  return (
    <div className="animate-pulse my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-4xl border-b-2 border-gray-100">
      <h1 className="text-3xl font-semibold">Pool Details</h1>
      <div className="flex flex-col border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50 w-full mb-4">
        <div className="pl-4 h-16">Loading...</div>
      </div>
    </div>
  );
}
