import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
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
          id: "type-a",
          hasSubmenu: true,
          submenu: [
            {
              label: "Soleil",
              id: "type-a-east",
              hasSubmenu: true,
              submenu: [
                { label: "East - 1", id: "type-a-east-1", path: "/plans/type-a/east-1" },
                { label: "East - 2", id: "type-a-east-2", path: "/plans/type-a/east-2" },
              ],
            },
            {
              label: "Ember",
              id: "type-a-west",
              hasSubmenu: true,
              submenu: [
                { label: "West - 1", id: "type-a-west-1", path: "/plans/type-a/west-1" },
                { label: "West - 2", id: "type-a-west-2", path: "/plans/type-a/west-2" },
              ],
            },
          ],
        },
        {
          label: "The Courtyard",
          id: "type-b",
          hasSubmenu: true,
          submenu: [
            { label: "Soleil", id: "type-b-east", path: "/plans/type-b/east" },
            { label: "Ember", id: "type-b-west", path: "/plans/type-b/west" },
          ],
        },
        {
          label: "The Estate",
          id: "type-c",
          hasSubmenu: true,
          submenu: [
            { label: "Soleil", id: "type-c-east", path: "/plans/type-c/east" },
            { label: "Ember", id: "type-c-west", path: "/plans/type-c/west" },
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
      navigate(item.path);
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
                onClick={() =>
                  item.hasSubmenu
                    ? toggleSubmenu(item.id)
                    : handleNavigation(item)
                }
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
                                        onClick={() => handleNavigation(deepItem)}
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
