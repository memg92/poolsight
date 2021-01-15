import React from "react";

export default function ErrorHandler({ error }) {
  return (
    <ul className="mx-auto m-4 p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
      <div className="font-semibold">We encountered the following error:</div>
      <li className="list-disc list-inside">{error}</li>
    </ul>
  );
}
