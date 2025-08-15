import React from "react";
import { Plane } from "lucide-react";

export default function FlightCard({ f }) {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Plane className="w-4 h-4 rotate-45 text-primary" /> {f.airline}
          </div>
          <span className="badge badge-outline">{f.flightNo}</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">{f.departTime}</div>
            <div className="text-xs text-base-content/60">{f.from}</div>
          </div>
          <div className="text-xs text-base-content/60">{f.duration}</div>
          <div className="text-right">
            <div className="text-lg font-bold">{f.arriveTime}</div>
            <div className="text-xs text-base-content/60">{f.to}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-base-content/70">
            {f.nonstop ? "Non-stop" : "1+ stops"}
          </div>
          <div className="text-right">
            <div className="text-xl font-extrabold">₹{f.priceINR?.toLocaleString?.() || f.priceINR}</div>
            <button className="btn btn-sm btn-primary mt-2">Select</button>
          </div>
        </div>
      </div>
    </div>
  );
}
