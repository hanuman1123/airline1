import React, { useState } from "react";
import { generateFlightsForDate } from "../../data/flightsData";
import HeroHeader from "./HeroHeader";
import SearchForm from "./SearchForm";
import FlightResults from "./FlightResults";

// Cities for autocomplete
const cities = [
  { code: "HYD", name: "Hyderabad" },
  { code: "DEL", name: "Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "MAA", name: "Chennai" },
  { code: "BLR", name: "Bengaluru" },
  { code: "CCU", name: "Kolkata" },
  { code: "PNQ", name: "Pune" },
  { code: "GOI", name: "Goa" },
  { code: "AMD", name: "Ahmedabad" },
  { code: "JAI", name: "Jaipur" },
];

export default function HeroSearch() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    departureDate: "",
    passengers: 1,
    travelClass: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFromInput = (value) => {
    onChange("from", value.toUpperCase());
    setFromSuggestions(
      value.length > 0
        ? cities.filter(
            (c) =>
              c.code.toLowerCase().includes(value.toLowerCase()) ||
              c.name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleToInput = (value) => {
    onChange("to", value.toUpperCase());
    setToSuggestions(
      value.length > 0
        ? cities.filter(
            (c) =>
              c.code.toLowerCase().includes(value.toLowerCase()) ||
              c.name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    setTimeout(() => {
      if (!form.from || !form.to || !form.departureDate) {
        setError("Please enter From, To, and Departure Date");
        setLoading(false);
        return;
      }

      // ✅ Generate flights only for this route/date
      let flights = generateFlightsForDate(
        form.departureDate,
        form.from,
        form.to
      );

      // ✅ Filter by class if selected
      if (form.travelClass) {
        flights = flights.filter(
          (f) => f.travelClass.toLowerCase() === form.travelClass.toLowerCase()
        );
      }

      if (flights.length === 0) {
        setError("No matching flights found");
      }
      setResults(flights);
      setLoading(false);
    }, 300);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-base-100 pointer-events-none" />
      <div className="container mx-auto px-4 pt-10 pb-6 relative">
        <HeroHeader />
        <div className="mx-auto max-w-4xl">
          <SearchForm
            form={form}
            onChange={onChange}
            onSubmit={handleSubmit}
            fromSuggestions={fromSuggestions}
            toSuggestions={toSuggestions}
            handleFromInput={handleFromInput}
            handleToInput={handleToInput}
            setFromSuggestions={setFromSuggestions}
            setToSuggestions={setToSuggestions}
            error={error}
          />
        </div>
        <FlightResults loading={loading} results={results} />
      </div>
    </section>
  );
}
