import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", id: "hero", path: "/" },
    { label: "Clubhouse", id: "clubhouse", path: "/clubhouse" },
    { label: "Central Park", id: "central-park", path: "/central-park" },
    {
      label: "Plans",
      id: "plans",
      hasSubmenu: true,
      submenu: [
        {
          label: "The Grove",
          id: "the-grove",
          hasSubmenu: true,
          submenu: [
            {
              label: "Soleil",
              id: "grove-soleil",
              hasSubmenu: true,
              submenu: [
                {
                  label: "Soleil - 1",
                  id: "grove-soleil-east",
                  path: "/villa/the-grove#floor-plans",
                  floorIndex: 0,
                },
                {
                  label: "Soleil - 2",
                  id: "grove-soleil-west",
                  path: "/villa/the-grove#floor-plans",
                  floorIndex: 1,
                },
              ],
            },
            {
              label: "Ember",
              id: "grove-ember",
              hasSubmenu: true,
              submenu: [
                {
                  label: "Ember - 1",
                  id: "grove-ember-east",
                  path: "/villa/the-grove#floor-plans",
                  floorIndex: 2,
                },
                {
                  label: "Ember - 2",
                  id: "grove-ember-west",
                  path: "/villa/the-grove#floor-plans",
                  floorIndex: 3,
                },
              ],
            },
          ],
        },
        {
          label: "The Courtyard",
          id: "the-courtyard",
          hasSubmenu: true,
          submenu: [
            {
              label: "Soleil",
              id: "courtyard-soleil",
              path: "/villa/the-courtyard#floor-plans",
              floorIndex: 0,
            },
            {
              label: "Ember",
              id: "courtyard-ember",
              path: "/villa/the-courtyard#floor-plans",
              floorIndex: 1,
            },
          ],
        },
        {
          label: "The Estate",
          id: "the-estate",
          hasSubmenu: true,
          submenu: [
            {
              label: "Soleil",
              id: "estate-soleil",
              path: "/villa/the-estate#floor-plans",
              floorIndex: 0,
            },
            {
              label: "Ember",
              id: "estate-ember",
              path: "/villa/the-estate#floor-plans",
              floorIndex: 1,
            },
          ],
        },
      ],
    },
  ];

  const toggleSubmenu = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMenuClick = (item) => {
    if (item.id === "plans" && !isPhoneVerified) {
      setShowPhonePopup(true);
      return;
    }

    if (item.hasSubmenu) {
      toggleSubmenu(item.id);
    } else {
      handleNavigation(item);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    setIsPhoneVerified(true);
    setShowPhonePopup(false);
    toggleSubmenu("plans");
  };

  const handleNavigation = (item) => {
    if (item.path === "/") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (item.path) {
      // Add floorIndex as query parameter if it exists
      const path =
        item.floorIndex !== undefined
          ? `${item.path}?floorIndex=${item.floorIndex}`
          : item.path;
      navigate(path);
    }
    if (!item.hasSubmenu) {
      setIsMenuOpen(false);
      setExpandedMenus({});
    }
  };

  return (
    <>
      {/* Logo Container */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50 bg-milk/80 backdrop-blur-md shadow-sm rounded-md p-2 sm:p-2.5">
        <img
          src="/images/nav-logo.svg"
          alt="Aarunya Villas - Greenrich Highlands"
          className="w-16 sm:w-18 md:w-20 lg:w-24 h-auto cursor-pointer"
          onClick={() => handleNavigation({ path: "/" })}
        />
      </div>

      {/* Hamburger Menu Button Container */}
      <button
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          if (isMenuOpen) setExpandedMenus({});
        }}
        className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 bg-milk/80 backdrop-blur-md shadow-sm rounded-md p-2 sm:p-2.5 w-12 h-12 sm:w-14 sm:h-14 flex flex-col gap-1.5 justify-center items-center cursor-pointer group"
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

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-gradient-to-b from-teal-700 to-teal-900 shadow-2xl z-[60] transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsMenuOpen(false);
            setExpandedMenus({});
          }}
          className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform duration-300"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col pt-24 px-8 pb-8 overflow-y-auto max-h-[calc(100vh-200px)]">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className="w-full text-left text-white text-lg font-light py-4 border-b border-teal-600/20 hover:bg-teal-600/20 hover:pl-4 transition-all duration-300 tracking-wide flex items-center justify-between"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen
                    ? "slideIn 0.4s ease-out forwards"
                    : "none",
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                <span>{item.label}</span>
                {item.hasSubmenu && (
                  <span className="text-xl font-light">
                    {expandedMenus[item.id] ? "−" : "+"}
                  </span>
                )}
              </button>

              {/* Level 1 Submenu */}
              {item.hasSubmenu && expandedMenus[item.id] && (
                <div className="pl-4 border-l-2 border-teal-400/30 ml-2">
                  {item.submenu.map((subItem) => (
                    <div key={subItem.id}>
                      <button
                        onClick={() =>
                          subItem.hasSubmenu
                            ? toggleSubmenu(subItem.id)
                            : handleNavigation(subItem)
                        }
                        className="w-full text-left text-white/90 text-lg font-light py-3 border-b border-teal-600/10 hover:bg-teal-600/10 hover:pl-2 transition-all duration-300 flex items-center justify-between"
                      >
                        <span>{subItem.label}</span>
                        {subItem.hasSubmenu && (
                          <span className="text-lg font-light">
                            {expandedMenus[subItem.id] ? "−" : "+"}
                          </span>
                        )}
                      </button>

                      {/* Level 2 Submenu */}
                      {subItem.hasSubmenu && expandedMenus[subItem.id] && (
                        <div className="pl-4 border-l-2 border-teal-400/30 ml-2">
                          {subItem.submenu.map((subSubItem) => (
                            <div key={subSubItem.id}>
                              <button
                                onClick={() =>
                                  subSubItem.hasSubmenu
                                    ? toggleSubmenu(subSubItem.id)
                                    : handleNavigation(subSubItem)
                                }
                                className="w-full text-left text-white/85 text-base font-light py-3 border-b border-teal-600/10 hover:bg-teal-600/10 hover:pl-2 transition-all duration-300 flex items-center justify-between"
                              >
                                <span>{subSubItem.label}</span>
                                {subSubItem.hasSubmenu && (
                                  <span className="text-base font-light">
                                    {expandedMenus[subSubItem.id] ? "−" : "+"}
                                  </span>
                                )}
                              </button>

                              {/* Level 3 Submenu */}
                              {subSubItem.hasSubmenu &&
                                expandedMenus[subSubItem.id] && (
                                  <div className="pl-4 border-l-2 border-teal-400/30 ml-2">
                                    {subSubItem.submenu.map((deepItem) => (
                                      <button
                                        key={deepItem.id}
                                        onClick={() =>
                                          handleNavigation(deepItem)
                                        }
                                        className="w-full text-left text-white/80 text-base font-light py-2 border-b border-teal-600/5 hover:bg-teal-600/10 hover:pl-2 transition-all duration-300"
                                      >
                                        {deepItem.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
          onClick={() => {
            setIsMenuOpen(false);
            setExpandedMenus({});
          }}
        />
      )}

      {/* Phone Verification Popup */}
      {showPhonePopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowPhonePopup(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setShowPhonePopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-dark-brown mb-2">
                Exclusive Access
              </h3>
              <p className="text-gray-600">
                Please enter your phone number to view our premium floor plans.
              </p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value.replace(/\D/g, ""));
                    setPhoneError("");
                  }}
                  placeholder="Enter Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none transition-all text-lg"
                  maxLength={10}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-teal-700 text-white font-bold py-3 rounded-lg hover:bg-teal-800 transition-colors shadow-lg"
              >
                View Plans
              </button>
            </form>
          </div>
        </div>
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default NavBar;
