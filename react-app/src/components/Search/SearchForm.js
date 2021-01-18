import React, { useState } from "react";
import { useSelector } from "react-redux";
import Suggestions from "./Suggestions";

export default function SearchForm({ setSearchOpen }) {
  const pools = useSelector((state) => state.poolAPI.pools);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  //helper function to deal with multiple keywords
  const myIncludes = (target, keywords) => {
    let result = false;
    keywords.forEach((word) => {
      if (target.includes(word)) {
        result = true;
      }
    });
    return result;
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.length) {
      setSearching(true);
    } else {
      setSearching(false);
    }

    //if there spaces, split all key words
    let searchInputs = e.target.value.includes(" ")
      ? e.target.value.toLowerCase().split(" ")
      : e.target.value.toLowerCase();

    let results;
    if (Array.isArray(searchInputs)) {
      results = pools.filter(
        ({ client }) =>
          myIncludes(client.firstname.toLowerCase(), searchInputs) ||
          myIncludes(client.lastname.toLowerCase(), searchInputs) ||
          myIncludes(client.street.toLowerCase(), searchInputs) ||
          myIncludes(client.city.toLowerCase(), searchInputs)
      );
    } else {
      results = pools.filter(
        ({ client }) =>
          client.firstname.toLowerCase().includes(searchInputs) ||
          client.lastname.toLowerCase().includes(searchInputs) ||
          client.street.toLowerCase().includes(searchInputs) ||
          client.city.toLowerCase().includes(searchInputs)
      );
    }
    // console.log(results, searchInputs);
    setSuggestions(results);
  };

  return (
    <form className="relative w-full mx-2">
      <input
        type="text"
        placeholder="Search client..."
        onChange={handleSearchInput}
        value={searchInput}
        className="form-input w-full rounded-lg"
      />
      {searching && (
        <Suggestions suggestions={suggestions} setSearchOpen={setSearchOpen} />
      )}
    </form>
  );
}
