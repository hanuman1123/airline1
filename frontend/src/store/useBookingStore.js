import { create } from "zustand";

export const useBookingStore = create((set) => ({
  bookings: [],

  addBooking: (flight, passenger) =>
    set((state) => ({
      bookings: [
        ...state.bookings,
        {
          id: Date.now(),
          flight,
          passenger,
        },
      ],
    })),

  clearBookings: () => set({ bookings: [] }),
}));
