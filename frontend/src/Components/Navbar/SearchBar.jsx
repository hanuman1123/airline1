// src/components/SearchBar.jsx
import React, { useState } from "react";
import { flights } from "../../data/flights.js";

const SearchBar = ({ onFlightSelect }) => {
  const [query, setQuery] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredFlights([]);
      setShowDropdown(false);
      return;
    }

    const results = flights.filter(
      (f) =>
        f.flightNo.toLowerCase().includes(value.toLowerCase()) ||
        f.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFlights(results);
    setShowDropdown(true);
  };

  const handleSelect = (flight) => {
    setQuery(flight.name); // show selected in input
    setShowDropdown(false);
    if (onFlightSelect) onFlightSelect(flight); // send selected to parent
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredFlights.length > 0) {
      handleSelect(filteredFlights[0]); // auto-select first
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full"
      >
        <input
          type="text"
          placeholder="Search flights..."
          value={query}
          onChange={handleChange}
          className="input input-bordered w-full rounded-l-full"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-r-full"
        >
          Search
        </button>
      </form>

      {showDropdown && filteredFlights.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
          {filteredFlights.map((flight) => (
            <li
              key={flight.id}
              onClick={() => handleSelect(flight)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              <span className="font-semibold">{flight.flightNo}</span> – {flight.name}  
              <span className="text-sm text-gray-500"> ₹{flight.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
