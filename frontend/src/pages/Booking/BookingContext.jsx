// src/pages/Booking/BookingContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  const addBooking = (booking) => {
    setBookings((prev) => {
      const updated = [...prev, booking];
      localStorage.setItem("bookings", JSON.stringify(updated));
      return updated;
    });
  };

  const clearBookings = () => {
    setBookings([]);
    localStorage.removeItem("bookings");
  };

  // ✅ Keep localStorage in sync if `bookings` changes
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, clearBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
