import FlightCard from "./FIeldCard";

export default function FlightResults({ loading, results }) {
  return (
    <div className="max-w-5xl mx-auto mt-6 grid gap-4">
      {loading && <div className="loading loading-bars loading-lg mx-auto" />}
      {!loading && results.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((f) => (
            <FlightCard key={f.id} f={f} />
          ))}
        </div>
      )}
    </div>
  );
}
