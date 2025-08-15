// src/components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Search flights..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input input-bordered w-full rounded-l-full"
      />
      <button
        type="submit"
        className="btn btn-primary rounded-r-full"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
