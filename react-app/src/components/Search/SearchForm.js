import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchForm() {
  const pools = useSelector((state) => state.poolAPI.pools);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    let searchInputs = searchInput.includes(" ")
      ? searchInput.split(" ")
      : searchInput;
    setSuggestions = pools.filter((pool) => {
      return pool;
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search for key terms..."
        onChange={handleSearchInput}
        className="form-input mx-2 h-8 rounded-lg"
      />
    </>
  );
}
