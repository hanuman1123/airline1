import { useEffect, useRef, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export default function HelpMenu() {
  const [showHelp, setShowHelp] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowHelp(false);
      }
    }
    if (showHelp) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHelp]);

  return (
    <div className="relative" ref={formRef}>
      <button
        className="text-gray-600 hover:text-primary transition-colors duration-200"
        onClick={() => setShowHelp(!showHelp)}
      >
        <FaQuestionCircle size={22} />
      </button>

      {/* Animated Dropdown */}
      <div
        className={`absolute top-10 right-0 w-60 z-50 transform transition-all duration-300 ease-out origin-top
          ${
            showHelp
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
      >
        <div className="bg-white shadow-lg border rounded-md p-3">
          {/* Helpline Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-2 
              hover:bg-blue-100 hover:shadow-md hover:-translate-y-0.5 
              transition-all duration-200 cursor-pointer">
            <p className="text-sm font-semibold text-blue-700">Helpline</p>
            <p className="text-sm text-blue-900">+91 7839283635</p>
          </div>

          {/* Email Box */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 
              hover:bg-green-100 hover:shadow-md hover:-translate-y-0.5 
              transition-all duration-200 cursor-pointer">
            <p className="text-sm font-semibold text-green-700">Email</p>
            <p className="text-sm text-green-900">flightsupport@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
