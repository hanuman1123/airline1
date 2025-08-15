// src/components/HeroSearch.jsx
import React, { useState } from "react";
import { Plane, MapPin, Users, Calendar, Search } from "lucide-react";
import Field from "./Field";
import FlightCard from "./FIeldCard";
import flightsData, { generateFlightsForDate } from "../../data/flightsData";

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

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    setTimeout(() => {
      // Build the pool for the selected date; fall back to today's if none chosen
      const pool = form.departureDate
        ? generateFlightsForDate(form.departureDate)
        : flightsData;

      const filteredFlights = pool.filter((flight) => {
        const fromMatch =
          !form.from || flight.from.toLowerCase() === form.from.toLowerCase();
        const toMatch =
          !form.to || flight.to.toLowerCase() === form.to.toLowerCase();
        const dateMatch =
          !form.departureDate || flight.departureDate === form.departureDate;
        const classMatch =
          !form.travelClass ||
          flight.travelClass.toLowerCase() === form.travelClass.toLowerCase();

        return fromMatch && toMatch && dateMatch && classMatch;
      });

      if (filteredFlights.length === 0) {
        setError("No matching flights found");
      }
      setResults(filteredFlights);
      setLoading(false);
    }, 300);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-base-100 pointer-events-none" />
      <div className="container mx-auto px-4 pt-10 pb-6 relative">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm">
            <Plane className="w-4 h-4 rotate-45" />
            Smart, fast & affordable flights
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight">
            Book flights with ease
          </h1>
          <p className="mt-3 text-base-content/60">
            Compare fares across airlines, choose your class, and check out in
            minutes.
          </p>
        </div>

        {/* Search Card */}
        <div className="mx-auto max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="card bg-base-100 shadow-xl border border-base-200"
          >
            <div className="card-body grid grid-cols-1 md:grid-cols-5 gap-4">
              <Field label="From" icon={<MapPin className="w-4 h-4" />}>
                <input
                  type="text"
                  placeholder="HYD"
                  className="input input-bordered w-full"
                  value={form.from}
                  onChange={(e) =>
                    onChange("from", e.target.value.toUpperCase())
                  }
                />
              </Field>

              <Field label="To" icon={<MapPin className="w-4 h-4" />}>
                <input
                  type="text"
                  placeholder="DEL"
                  className="input input-bordered w-full"
                  value={form.to}
                  onChange={(e) => onChange("to", e.target.value.toUpperCase())}
                />
              </Field>

              <Field label="Departure Date" icon={<Calendar className="w-4 h-4" />}>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={form.departureDate}
                  onChange={(e) => onChange("departureDate", e.target.value)}
                />
              </Field>

              <Field label="Class" icon={<Plane className="w-4 h-4" />}>
                <select
                  className="select select-bordered w-full"
                  value={form.travelClass}
                  onChange={(e) => onChange("travelClass", e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First</option>
                </select>
              </Field>

              <Field label="Passengers" icon={<Users className="w-4 h-4" />}>
                <input
                  type="number"
                  min={1}
                  className="input input-bordered w-full"
                  value={form.passengers}
                  onChange={(e) =>
                    onChange("passengers", Math.max(1, Number(e.target.value)))
                  }
                />
              </Field>
            </div>

            <div className="p-4 flex justify-end">
              <button type="submit" className="btn btn-primary">
                <Search className="w-4 h-4" /> Search Flights
              </button>
            </div>
            {error && <div className="alert alert-info mt-4">{error}</div>}
          </form>
        </div>

        {/* Results */}
        <div className="max-w-5xl mx-auto mt-6 grid gap-4">
          {loading && <div className="loading loading-bars loading-lg mx-auto" />}
          {!loading && results.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((f) => (
                <FlightCard key={f.id} f={f} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
