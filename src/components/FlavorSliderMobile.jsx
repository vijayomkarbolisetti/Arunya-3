import { flavorlists } from "../constants";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PhoneVerificationPopup from "./PhoneVerificationPopup";

const FlavorSliderMobile = () => {
  const navigate = useNavigate();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
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

  const handlePhoneSuccess = () => {
    setIsPhoneVerified(true);
    setPendingVillaId(null);
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

      {/* Phone Verification Popup - Reusable Component */}
      <PhoneVerificationPopup
        isOpen={showPhonePopup}
        onClose={() => setShowPhonePopup(false)}
        onSuccess={handlePhoneSuccess}
        pendingVillaId={pendingVillaId}
      />
    </>
  );
};

export default FlavorSliderMobile;

