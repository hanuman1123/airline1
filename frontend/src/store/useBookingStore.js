// src/store/useBookingStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (flight, passenger) =>
        set((state) => ({
          bookings: [...state.bookings, { flight, passenger }],
        })),
      clearBookings: () => set({ bookings: [] }),
    }),
    {
      name: "booking-storage", // key in localStorage
    }
  )
);
