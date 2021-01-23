import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPools } from "../../store/pools";
import Suggestions from "./Suggestions";

export default function SearchForm({ searchOpen, setSearchOpen }) {
  const pools = useSelector((state) => state.poolAPI.pools);
  const user = useSelector((state) => state.session.user);
  const [searchInput, setSearchInput] = useState("");
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pools.length && location.pathname !== "/") {
      // debugger;
      dispatch(getPools(user.id));
    }
  }, [dispatch]);

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
    //if search input is an array (multi-word), filter results using custom function
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
    // set the suggestions to the result array to pass to Suggestions component
    setSuggestions(results);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let searchQuery = searchInput.replace(/\s/g, "+");
    let res = await fetch(`/api/pools/search/${searchQuery}`);
    let data = await res.json();
    setSearchOpen(false);
    history.push(`/search/${searchQuery}`, data);
  };

  return (
    <form
      className={"relative z-10 w-full mx-2 animate-scale-in-hor-right"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search client..."
        onChange={handleSearchInput}
        value={searchInput}
        className="form-input text-pnavy w-full focus:bg-blue-100 focus:border-pblue border-2 rounded-lg"
      />
      {searching && (
        <Suggestions suggestions={suggestions} setSearchOpen={setSearchOpen} />
      )}
    </form>
  );
}
