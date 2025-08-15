// src/components/Navbar/RegionSelector.jsx
import { useState, useEffect, useRef } from "react";

const regions = [
  {
    name: "United States",
    flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0SVX-2_OPGhAieNJDzQpyJ9pBGMyLUB7OxtI9sDbBUIwVsAllq1HSmTm_3xc0W8NxiPU&usqp=CAU",
    currency: "USD",
    languages: ["English", "Spanish"],
  },
  {
    name: "India",
    flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRieT9dg_NEMZpaMubj64vmdAfx8EXgJ5keSgIyYpDT5NuCAsAdtoVxyEgkHz390O0kICc&usqp=CAU",
    currency: "INR",
    languages: ["English", "Hindi", "Assamese", "Bengali", "Gujarati", "Marathi"],
  },
  {
    name: "United Kingdom",
    flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8NfI1WIWXyzKy7BSk_iFstu4pf9V1Yx5Im1Ptvl8xUx5VND6Fd3Jv1Syamm6b9jDbnjs&usqp=CAU",
    currency: "GBP",
    languages: ["English", "Welsh"],
  },
  {
    name: "Australia",
    flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgBNgsUFCvPCbQvYOMqGYuqLc5zqqBxEBj4cD_LOok2wvzZA8gZKtSdrU94WRUaU0YkiA&usqp=CAU",
    currency: "AUD",
    languages: ["English"],
  },
  {
    name: "Canada",
    flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9Tnt0qx-TlKmEKMtnXYecttgHhUb3yy4g5Gq1-qfKt_Qo7QzNzJYuY7509J8bsU7NnI&usqp=CAU",
    currency: "CAD",
    languages: ["English", "French"],
  },
];

export default function RegionSelector() {
  const [selectedCountry, setSelectedCountry] = useState(regions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(regions[0].languages[0]);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    }
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedLanguage(country.languages[0]);
  };

  const handleSubmit = () => {
    console.log("Country:", selectedCountry.name);
    console.log("Currency:", selectedCountry.currency);
    console.log("Language:", selectedLanguage);
    setShowForm(false);
  };

  return (
    <div className="relative">
      {showForm ? (
        <div
          ref={formRef}
          className="absolute right-0 mt-4 p-4 border rounded-lg shadow-lg w-72 bg-white z-50"
        >
          {/* Country Selection */}
          <label className="block mb-2 font-bold">Country</label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {regions.map((region) => (
              <div
                key={region.name}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${
                  selectedCountry.name === region.name ? "bg-gray-200" : ""
                }`}
                onClick={() => handleCountryChange(region)}
              >
                <img
                  src={region.flag}
                  alt={region.name}
                  className="w-6 h-4 object-cover border"
                />
                <span>{region.name}</span>
              </div>
            ))}
          </div>

          {/* Currency */}
          <label className="block mt-4 mb-2 font-bold">Currency</label>
          <input
            type="text"
            value={selectedCountry.currency}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Language */}
          <label className="block mt-4 mb-2 font-bold">Language</label>
          <select
            className="select select-bordered w-full"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {selectedCountry.languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          {/* Submit */}
          <button onClick={handleSubmit} className="btn btn-primary w-full mt-4">
            Submit
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-circle btn-outline"
        >
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="w-6 h-4 object-cover"
          />
        </button>
      )}
    </div>
  );
}
