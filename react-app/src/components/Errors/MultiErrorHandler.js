import React from "react";

export default function MultiErrorHandler({ errors }) {
  return (
    <ul className="mx-auto m-4 p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
      <div className="font-semibold">We encountered the following errors:</div>
      {Array.isArray(errors) ? (
        errors.map((error, i) => (
          <li className="list-disc list-inside" key={i}>
            {error}
          </li>
        ))
      ) : (
        <li className="list-disc list-inside">{errors}</li>
      )}
    </ul>
  );
}
