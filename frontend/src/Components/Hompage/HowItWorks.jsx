export default function HowItWorks() {
  const steps = [
    { step: "Search Flights", desc: "Find flights from your location to your dream destination." },
    { step: "Choose Flight", desc: "Select the flight that best fits your schedule and budget." },
    { step: "Book & Enjoy", desc: "Secure your seat and enjoy your trip!" }
  ];

  return (
    <section className="py-12 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="p-6 bg-base-100 rounded-lg shadow">
              <h3 className="font-bold text-lg">{s.step}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
