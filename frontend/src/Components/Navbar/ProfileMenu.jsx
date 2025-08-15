import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center">
      {!authUser ? (
        <div>
          <a
            href="/login"
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg hover:from-pink-600 hover:to-orange-600 transition-transform transform hover:scale-105"
          >
            SIGN IN / SIGN UP
          </a>
        </div>
      ) : (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-base-300 rounded-lg z-50 p-4">
              <div className="flex items-center gap-3 border-b border-gray-600 pb-3 mb-3">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
                />
                <div>
                  <p className="font-semibold">{authUser.fullName}</p>
                  <p className="text-sm text-gray-400">{authUser.email}</p>
                </div>
              </div>

              <a
                href="/profile"
                className="flex items-center gap-2 p-2 rounded hover:bg-base-200 transition"
              >
                <User className="w-4 h-4" /> View Profile
              </a>

              <button
                onClick={logout}
                className="flex items-center gap-2 w-full p-2 text-left rounded hover:bg-red-500 hover:text-white transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
