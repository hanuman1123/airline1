import { MapPin, Users, Calendar, Plane, Search } from "lucide-react";
import Field from "./Field";

export default function SearchForm({
  form,
  onChange,
  onSubmit,
  fromSuggestions,
  toSuggestions,
  handleFromInput,
  handleToInput,
  setFromSuggestions,
  setToSuggestions,
  error,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="card bg-base-100 shadow-xl border border-base-200"
    >
      <div className="card-body grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* From */}
        <Field label="From" icon={<MapPin className="w-4 h-4" />}>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city/airport"
              className="input input-bordered w-full"
              value={form.from}
              onChange={(e) => handleFromInput(e.target.value)}
            />
            {fromSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
                {fromSuggestions.map((c) => (
                  <li
                    key={c.code}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange("from", c.code);
                      setFromSuggestions([]);
                    }}
                  >
                    {c.code} - {c.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>

        {/* To */}
        <Field label="To" icon={<MapPin className="w-4 h-4" />}>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city/airport"
              className="input input-bordered w-full"
              value={form.to}
              onChange={(e) => handleToInput(e.target.value)}
            />
            {toSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
                {toSuggestions.map((c) => (
                  <li
                    key={c.code}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange("to", c.code);
                      setToSuggestions([]);
                    }}
                  >
                    {c.code} - {c.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>

        {/* Date */}
        <Field label="Departure Date" icon={<Calendar className="w-4 h-4" />}>
          <input
            type="date"
            className="input input-bordered w-full"
            value={form.departureDate}
            onChange={(e) => onChange("departureDate", e.target.value)}
          />
        </Field>

        {/* Class */}
        <Field label="Class" icon={<Plane className="w-4 h-4" />}>
          <select
            className="select select-bordered w-full"
            value={form.travelClass}
            onChange={(e) => onChange("travelClass", e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="economy">Economy</option>
            <option value="premium economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </Field>

        {/* Passengers */}
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
  );
}
