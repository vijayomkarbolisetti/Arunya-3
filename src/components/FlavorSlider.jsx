import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const FlavorSlider = () => {
  const sliderRef = useRef();
  const navigate = useNavigate();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pendingVillaId, setPendingVillaId] = useState(null);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  // Convert villa name to URL-friendly ID
  const getVillaId = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleVillaClick = (flavor) => {
    const villaId = getVillaId(flavor.name);
    
    if (!isPhoneVerified) {
      setPendingVillaId(villaId);
      setShowPhonePopup(true);
      return;
    }
    
    navigate(`/villa/${villaId}`);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    setIsPhoneVerified(true);
    setShowPhonePopup(false);
    
    // Navigate to the pending villa
    if (pendingVillaId) {
      navigate(`/villa/${pendingVillaId}`);
      setPendingVillaId(null);
    }
  };

  useGSAP(() => {
    // Force reset all elements to initial positions
    gsap.set([".general-title", ".first-text-split", ".flavor-text-scroll", ".second-text-split"], {
      xPercent: 0,
      x: 0,
      clearProps: "transform",
    });

    if (sliderRef.current) {
      // Set slider initial position
      gsap.set(sliderRef.current, { x: 0 });
    }

    if (!isTablet && sliderRef.current) {
      const scrollAmount = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".slider-wrapper",
          start: "top top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: ".flavor-section",
        },
      });

      tl.to(sliderRef.current, {
        x: `-${scrollAmount}px`,
        ease: "none",
      });
    }
  }, [isTablet]);

  return (
    <>
      <div ref={sliderRef} className="slider-wrapper">
        <div className="flavors">
          {flavorlists.map((flavor) => (
            <div
              key={flavor.name}
              onClick={() => handleVillaClick(flavor)}
              className={`relative z-30 w-[85vw] sm:w-96 md:w-[90vw] lg:w-[40vw] h-72 sm:h-80 md:h-[50vh] lg:h-[60vh] flex-none ${flavor.rotation} overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer group transition-all duration-300 hover:scale-105`}
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-20" />
              
              {/* Click indicator */}
              <div className="absolute top-4 right-4 z-30 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Details →
              </div>

              <img
                src={`/images/${flavor.color}.jpg`}
                alt={flavor.name}
                className="drinks transition-transform duration-300 group-hover:scale-110"
              />

              <h1 className="transition-transform duration-300 group-hover:scale-105">{flavor.name}</h1>
            </div>
          ))}
        </div>
      </div>

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
                Please enter your phone number to view villa details.
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
                View Villa Details
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
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

export default FlavorSlider;
