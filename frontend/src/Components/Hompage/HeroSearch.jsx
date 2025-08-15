import React, { useState } from "react";
import { Plane, MapPin, Calendar, Users, Search } from "lucide-react";
import Field from "./Field";
import FlightCard from "./FIeldCard";

export default function HeroSearch() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    travelClass: "economy",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSwap = () => {
    setForm((f) => ({ ...f, from: f.to, to: f.from }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to fetch flights");
      const data = await res.json();
      setResults(data?.flights || []);
    } catch (err) {
      console.log(err);
      setError("Showing demo results (API not connected)");
      setResults([
        {
          _id: "demo1",
          airline: "SkyJet Airways",
          flightNo: "SJ 204",
          from: form.from || "HYD",
          to: form.to || "DEL",
          departTime: "08:45",
          arriveTime: "10:55",
          duration: "2h 10m",
          priceINR: 5499,
          nonstop: true,
        },
        {
          _id: "demo2",
          airline: "Indio Air",
          flightNo: "IA 881",
          from: form.from || "HYD",
          to: form.to || "DEL",
          departTime: "12:30",
          arriveTime: "15:20",
          duration: "2h 50m",
          priceINR: 6199,
          nonstop: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-base-100 pointer-events-none" />

      <div className="container mx-auto px-4 pt-10 pb-6 lg:pt-16 lg:pb-10 relative">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm">
            <Plane className="w-4 h-4 rotate-45" />
            Smart, fast & affordable flights
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Book flights with ease
          </h1>
          <p className="mt-3 text-base-content/60">
            Compare fares across airlines, choose your class, and check out in minutes.
          </p>
        </div>

        {/* Search card */}
        <div className="mx-auto max-w-5xl">
          <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-3">
                <Field label="From" icon={<MapPin className="w-4 h-4" />}>
                  <input
                    type="text"
                    placeholder="HYD"
                    className="input input-bordered w-full"
                    value={form.from}
                    onChange={(e) => onChange("from", e.target.value.toUpperCase())}
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

                <Field label="Departure" icon={<Calendar className="w-4 h-4" />}>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={form.departureDate}
                    onChange={(e) => onChange("departureDate", e.target.value)}
                  />
                </Field>

                <Field label="Return (optional)" icon={<Calendar className="w-4 h-4" />}>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={form.returnDate}
                    onChange={(e) => onChange("returnDate", e.target.value)}
                  />
                </Field>

                <Field label="Passengers" icon={<Users className="w-4 h-4" />}>
                  <input
                    type="number"
                    min={1}
                    className="input input-bordered w-full"
                    value={form.passengers}
                    onChange={(e) => onChange("passengers", Math.max(1, Number(e.target.value)))}
                  />
                </Field>

                <Field label="Class" icon={<Plane className="w-4 h-4" />}>
                  <select
                    className="select select-bordered w-full"
                    value={form.travelClass}
                    onChange={(e) => onChange("travelClass", e.target.value)}
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First</option>
                  </select>
                </Field>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-ghost" onClick={handleSwap}>
                  Swap
                </button>
                <button type="submit" className="btn btn-primary ml-auto">
                  <Search className="w-4 h-4" />
                  Search Flights
                </button>
              </div>

              {error && <div className="alert alert-info mt-4">{error}</div>}
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="max-w-5xl mx-auto mt-6 grid gap-4">
          {loading && <div className="loading loading-bars loading-lg mx-auto" />}
          {!loading && results.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((f) => (
                <FlightCard key={f._id} f={f} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
