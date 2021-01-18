import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Suggestions({ suggestions, setSearchOpen }) {
  const handleClick = (e) => {
    setSearchOpen(false);
  };

  return (
    <div className="absolute w-full max-h-44 overflow-y-scroll p-2 bg-white rounded border-2 border-ghost">
      {suggestions.map((suggestion) => {
        let client = suggestion.client;
        return (
          <NavLink
            key={client.id}
            to={`/client/${client.id}`}
            onClick={handleClick}
            className="cursor-pointer"
          >
            <p className="truncate ... py-1 text-gray-500 hover:bg-ghost">
              {`${client.firstname} ${client.lastname}: ${client.street}`}
            </p>
          </NavLink>
        );
      })}
    </div>
  );
}
