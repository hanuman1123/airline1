// src/components/FlightCard.jsx
import React, { useState } from "react";
import { Plane, Calendar } from "lucide-react";
import { useBookingStore } from "../../store/useBookingStore.js"; // ✅ Zustand instead of Context

export default function FlightCard({ f }) {
  const { addBooking } = useBookingStore(); // ✅ Zustand function
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  });

  const handleBook = () => {
    addBooking(f, form); // ✅ Store flight + passenger in Zustand
    setShowForm(false);
    alert("🎉 Flight booked successfully!");
  };

  return (
    <div className="card bg-white shadow-lg border border-base-200 p-4">
      {/* Airline & Class */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{f.airline}</h2>
        <span className="badge badge-primary capitalize">{f.travelClass}</span>
      </div>

      {/* Route */}
      <div className="mt-2 flex items-center gap-2 text-gray-600">
        <Plane className="w-4 h-4" />
        {f.from} → {f.to}
      </div>

      {/* Departure Date & Time */}
      <div className="mt-1 text-sm text-gray-500 flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        {f.departureDate} at {f.departureTime}
      </div>

      {/* Price */}
      <div className="mt-2 font-bold text-lg text-primary">₹{f.price}</div>

      {/* Select Button */}
      <button
        onClick={() => setShowForm(true)}
        className="btn btn-sm btn-outline mt-3 w-full"
      >
        Select
      </button>

      {/* Passenger Form */}
      {showForm && (
        <div className="mt-3 border-t pt-3">
          <h3 className="font-semibold mb-2">Passenger Details</h3>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full mb-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            className="input input-bordered w-full mb-2"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <select
            className="select select-bordered w-full mb-2"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option disabled value="">
              Select Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="input input-bordered w-full mb-2"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <button
            onClick={handleBook}
            className="btn btn-primary w-full mt-2"
          >
            Book Flight
          </button>
        </div>
      )}
    </div>
  );
}
