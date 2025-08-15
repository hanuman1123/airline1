// src/data/flightsData.js
const classes = ["economy", "premium", "business", "first"];

function getRandomClass() {
  return classes[Math.floor(Math.random() * classes.length)];
}

/**
 * Generate 12 flights (hourly) from HYD -> DEL for a given YYYY-MM-DD date.
 * Hours: 06:00 to 17:00 inclusive.
 */
export function generateFlightsForDate(date) {
  return Array.from({ length: 12 }, (_, i) => {
    const hour = i + 6; // 6 AM .. 5 PM
    return {
      id: `${date}-${i + 1}`,
      from: "HYD",
      to: "DEL",
      departureDate: date,                                 // <-- dynamic
      departureTime: `${hour.toString().padStart(2, "0")}:00`,
      airline: `Air India ${i + 101}`,
      price: Math.floor(Math.random() * 5000) + 3000,
      travelClass: getRandomClass(),
    };
  });
}

// Keep default export as today's flights so existing imports still work.
const today = new Date().toISOString().split("T")[0];
const flightsData = generateFlightsForDate(today);
export default flightsData;
