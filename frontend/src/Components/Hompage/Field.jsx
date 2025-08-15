import React from "react";

export default function Field({ label, icon, children }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text flex items-center gap-2 text-sm font-medium">
          {icon} {label}
        </span>
      </div>
      {children}
    </label>
  );
}
