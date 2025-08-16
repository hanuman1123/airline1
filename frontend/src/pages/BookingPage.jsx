// src/pages/Booking.jsx
import React from "react";
import { useBooking } from "../pages/Booking/BookingContext"

export default function Booking() {
  const { bookings } = useBooking();

  if (bookings.length === 0) {
    return <h2 className="text-center mt-10">No bookings yet ✈️</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {bookings.map((b, i) => (
          <div key={i} className="card bg-white shadow-lg p-4 border">
            <h2 className="font-bold">{b.airline}</h2>
            <p>
              {b.from} → {b.to}
            </p>
            <p>
              {b.departureDate} at {b.departureTime}
            </p>
            <p className="font-bold text-primary">₹{b.price}</p>
            <hr className="my-2" />
            <h3 className="font-semibold">Passenger</h3>
            <p>{b.passenger.name}, {b.passenger.age} ({b.passenger.gender})</p>
            <p>{b.passenger.email}</p>
            <p>{b.passenger.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
