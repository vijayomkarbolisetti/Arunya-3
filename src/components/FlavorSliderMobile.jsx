import { flavorlists } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FlavorSliderMobile = () => {
  const navigate = useNavigate();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pendingVillaId, setPendingVillaId] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    const verified = localStorage.getItem("phoneVerified");
    if (verified === "true") {
      setIsPhoneVerified(true);
    }
  }, []);

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
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    // Store verification in localStorage
    localStorage.setItem("phoneVerified", "true");
    localStorage.setItem("userPhone", phoneNumber);

    setIsPhoneVerified(true);
    setShowPhonePopup(false);

    // Navigate to the pending villa and scroll to top
    if (pendingVillaId) {
      navigate(`/villa/${pendingVillaId}`);
      setPendingVillaId(null);
      // Scroll to top after a small delay to ensure navigation completes
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 mt-8">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            onClick={() => handleVillaClick(flavor)}
            className="relative w-full h-80 overflow-hidden rounded-2xl shadow-lg cursor-pointer group active:scale-95 transition-transform duration-200"
          >
            <img
              src={`/images/${flavor.color}.jpg`}
              alt={flavor.name}
              className="w-full h-full object-cover transition-transform duration-300 group-active:scale-110"
            />
            
            {/* Tap indicator */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
              Tap to View
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h1 className="text-white text-3xl font-bold mb-2">
                {flavor.name}
              </h1>
              <p className="text-white text-lg opacity-90">
                {flavor.sqft}
              </p>
            </div>
          </div>
        ))}
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

export default FlavorSliderMobile;

