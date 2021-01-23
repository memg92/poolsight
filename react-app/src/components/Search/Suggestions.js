import React from "react";
import { NavLink } from "react-router-dom";

export default function Suggestions({ suggestions, setSearchOpen }) {
  const handleClick = (e) => {
    setSearchOpen(false);
  };

  return (
    <div className="absolute z-10 w-full max-h-44 min-h-full overflow-y-scroll p-2 bg-white rounded border-2 border-ghost">
      {suggestions.length ? (
        suggestions.map((suggestion) => {
          let client = suggestion.client;
          return (
            <NavLink
              key={client.id}
              to={`/client/${client.id}`}
              onClick={handleClick}
              className="cursor-pointer"
            >
              <p className="truncate ... p-1 text-gray-500 hover:bg-ghost rounded">
                {`${client.firstname} ${client.lastname}: ${client.street}`}
              </p>
            </NavLink>
          );
        })
      ) : (
        <p className="truncate ... p-1 text-gray-500 rounded">
          No clients found...
        </p>
      )}
    </div>
  );
}
