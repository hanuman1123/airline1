export default function PopularDestinations() {
  const destinations = [
    { name: "New York", img: "https://source.unsplash.com/400x300/?newyork" },
    { name: "Paris", img: "https://source.unsplash.com/400x300/?paris" },
    { name: "Tokyo", img: "https://source.unsplash.com/400x300/?tokyo" }
  ];

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <div key={i} className="card bg-base-200 shadow-lg">
              <figure>
                <img src={d.img} alt={d.name} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{d.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
