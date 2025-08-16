import React from "react";
import { useBookingStore } from "../store/useBookingStore";

export default function Booking() {
  const { bookings, removeBooking, clearBookings } = useBookingStore();

  if (bookings.length === 0) {
    return <h2 className="text-center mt-10">No bookings yet ✈️</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={clearBookings}
          className="btn btn-error btn-sm text-white"
        >
          Clear All
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="card bg-white shadow-lg p-4 border">
            <h2 className="font-bold">{b.flight.airline}</h2>
            <p>
              {b.flight.from} → {b.flight.to}
            </p>
            <p>
              {b.flight.departureDate} at {b.flight.departureTime}
            </p>
            <p className="font-bold text-primary">₹{b.flight.price}</p>
            <hr className="my-2" />
            <h3 className="font-semibold">Passenger</h3>
            <p>
              {b.passenger.name}, {b.passenger.age} ({b.passenger.gender})
            </p>
            <p>{b.passenger.email}</p>
            <p>{b.passenger.phone}</p>

            <button
              onClick={() => removeBooking(b.id)}
              className="btn btn-sm btn-outline btn-error mt-3"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
