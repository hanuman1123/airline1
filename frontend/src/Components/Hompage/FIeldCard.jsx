// src/components/FlightCard.jsx
import React from "react";
import { Plane, Calendar } from "lucide-react";

export default function FlightCard({ f, onSelect }) {
  return (
    <div className="card bg-white shadow-lg border border-base-200 p-4">
      {/* Airline & Class */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{f.airline || "Select Airline"}</h2>
        <span className="badge badge-primary capitalize">
          {f.travelClass || "Select Class"}
        </span>
      </div>

      {/* Route */}
      <div className="mt-2 flex items-center gap-2 text-gray-600">
        <Plane className="w-4 h-4" />
        {f.from || "Select From"} → {f.to || "Select To"}
      </div>

      {/* Departure Date & Time */}
      <div className="mt-1 text-sm text-gray-500 flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        {f.departureDate || "Select Date"}{" "}
        {f.departureTime ? `at ${f.departureTime}` : ""}
      </div>

      {/* Price */}
      <div className="mt-2 font-bold text-lg text-primary">
        {f.price ? `₹${f.price}` : "Select Price"}
      </div>

      {/* Select Button */}
      <button
        onClick={() => onSelect(f)}
        className="btn btn-sm btn-outline mt-3 w-full"
      >
        {f.buttonLabel || "Select"}
      </button>
    </div>
  );
}
