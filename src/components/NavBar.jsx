import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", id: "hero", path: "/" },
    { label: "Clubhouse", id: "clubhouse", path: "/clubhouse" },
  ];

  const handleNavigation = (item) => {
    if (item.path === "/") {
      if (location.pathname !== "/") {
        navigate("/");
        // Allow time for navigation before scrolling
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate(item.path);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 m-3 sm:m-5 md:m-7 lg:m-9 rounded-md px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-milk/80 backdrop-blur-md shadow-sm flex items-center justify-between w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-3.5rem)] lg:w-[calc(100%-4.5rem)]">
        <img
          src="/images/nav-logo.svg"
          alt="Aarunya Villas - Greenrich Highlands"
          className="w-16 sm:w-18 md:w-20 lg:w-24 h-auto cursor-pointer"
          onClick={() => handleNavigation({ path: "/" })}
        />

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 w-8 h-8 justify-center items-center cursor-pointer group"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-gradient-to-b from-teal-700 to-teal-900 shadow-2xl z-[60] transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform duration-300"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col pt-24 px-8 pb-8">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item)}
              className="text-left text-white text-lg font-light py-4 border-b border-teal-600/20 hover:bg-teal-600/20 hover:pl-4 transition-all duration-300 tracking-wide"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isMenuOpen
                  ? "slideIn 0.4s ease-out forwards"
                  : "none",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-8 right-8 text-white/70 text-sm space-y-2">
          <p className="font-light">© 2024 Aarunya Villas</p>
          <p className="text-xs">Greenrich Highlands</p>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;
