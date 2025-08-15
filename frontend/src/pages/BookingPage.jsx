// src/pages/BookingPage.jsx
import React, { useState } from "react";
import FlightCard from "../Components/Hompage/FIeldCard.jsx";
import TicketBooking from "../pages/TicketBooking.jsx";
import flightsData from "../data/flightsData.js"

export default function BookingPage() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookings, setBookings] = useState([]);

  const handleBook = (booking) => {
    setBookings((prev) => [...prev, booking]);
    setSelectedFlight(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>
      {!selectedFlight && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flightsData.map((f) => (
            <FlightCard key={f.id} f={f} onSelect={setSelectedFlight} />
          ))}
        </div>
      )}

      {selectedFlight && (
        <TicketBooking
          flight={selectedFlight}
          onBook={handleBook}
          onCancel={() => setSelectedFlight(null)}
        />
      )}

      {bookings.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Booked Tickets</h2>
          <ul className="list-disc pl-6">
            {bookings.map((b, i) => (
              <li key={i}>
                {b.passengerName} booked {b.passengers} seat(s) on {b.airline} — {b.departureDate} {b.departureTime}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
