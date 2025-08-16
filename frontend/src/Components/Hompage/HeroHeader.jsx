import { Plane } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm">
        <Plane className="w-4 h-4 rotate-45" />
        Smart, fast & affordable flights
      </div>
      <h1 className="mt-3 text-3xl font-bold leading-tight">
        Book flights with ease
      </h1>
      <p className="mt-3 text-base-content/60">
        Compare fares across airlines, choose your class, and check out in
        minutes.
      </p>
    </div>
  );
}
