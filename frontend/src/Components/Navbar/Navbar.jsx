import Logo from "./Logo";
import HelpMenu from "./HelpMenu";
import RegionSelector from "./RegionSelector";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-md px-6 py-3 flex items-center">
      {/* Left Section */}
      <div className="flex-1 flex items-center gap-4">
        <Logo />
      </div>

      {/* Center Section */}
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <HelpMenu />
        <RegionSelector />
        <ProfileMenu />
      </div>
    </nav>
  );
}

export default Navbar;
