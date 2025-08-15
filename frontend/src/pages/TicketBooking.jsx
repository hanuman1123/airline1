// src/components/TicketBooking.jsx
import React, { useState } from "react";

export default function TicketBooking({ flight, onBook, onCancel }) {
  const [name, setName] = useState("");
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      ...flight,
      passengerName: name,
      passengers,
      bookingDate: new Date().toISOString(),
    };
    onBook(booking);
  };

  return (
    <div className="card bg-base-100 shadow-lg border border-base-200 p-4">
      <h2 className="font-bold text-lg mb-2">Book Ticket</h2>
      <p className="text-sm mb-2">
        {flight.from} → {flight.to} | {flight.departureDate} {flight.departureTime}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Passenger Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          min={1}
          className="input input-bordered w-full"
          value={passengers}
          onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary flex-1">Confirm</button>
          <button type="button" className="btn flex-1" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
