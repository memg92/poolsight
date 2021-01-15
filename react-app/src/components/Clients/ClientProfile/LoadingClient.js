import React from "react";

export default function LoadingClient() {
  return (
    <div className="animate-pulse shadow-xl mb-4 mt-10 p-6 text-pnavy text-opacity-90 max-w-4xl w-full">
      <div className="pb-4">
        <h1 className="text-3xl font-semibold">Loading Client...</h1>
      </div>
      <div className="max-w-3xl w-full bg-gray-100"></div>
    </div>
  );
}
