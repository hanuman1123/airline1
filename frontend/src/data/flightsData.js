// src/data/flightsData.js
const classes = ["economy", "premium economy", "business", "first"];

// 🎯 Random travel class
function getRandomClass() {
  return classes[Math.floor(Math.random() * classes.length)];
}

// ✅ Generate 12 flights per route & date
export function generateFlightsForDate(date, from, to) {
  const flights = [];
  let hour = 6; // Start at 6 AM

  for (let i = 0; i < 12; i++) {
    flights.push({
      id: `${date}-${from}-${to}-${i + 1}`,
      from,
      to,
      departureDate: date,
      departureTime: `${(hour + i * 1).toString().padStart(2, "0")}:00`, // every 1hr
      airline: `Airline ${Math.floor(Math.random() * 900 + 100)}`,
      price: Math.floor(Math.random() * 4000) + 2000,
      travelClass: getRandomClass(),
    });
  }

  return flights;
}

// Default flights for today (HYD → DEL)
const today = new Date().toISOString().split("T")[0];
const flightsData = generateFlightsForDate(today, "HYD", "DEL");
export default flightsData;
