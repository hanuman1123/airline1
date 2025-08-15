import { Plane } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-blue-50 p-12">
      <div className="max-w-md text-center">
        {/* Big airplane icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-200 rounded-full p-8 animate-pulse">
            <Plane className="size-20 text-blue-700 rotate-45" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-blue-800 mb-4">{title}</h2>
        <p className="text-blue-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
