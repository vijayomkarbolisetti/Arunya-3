import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Reusable Phone Verification Popup Component
 * Used to verify phone number before accessing villa details
 */
const PhoneVerificationPopup = ({ isOpen, onClose, onSuccess, pendingVillaId }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    // Store verification in localStorage
    localStorage.setItem("phoneVerified", "true");
    localStorage.setItem("userPhone", phoneNumber);

    // Reset form
    setPhoneNumber("");
    setPhoneError("");
    onClose();

    // If onSuccess callback provided, call it
    if (onSuccess) {
      onSuccess();
    }

    // If pendingVillaId provided, navigate to it
    if (pendingVillaId) {
      navigate(`/villa/${pendingVillaId}`);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <div 
          className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
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

          <form onSubmit={handlePhoneSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value.replace(/\D/g, ""));
                  setPhoneError("");
                }}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-dark-brown focus:ring-2 focus:ring-dark-brown/20 outline-none transition-all text-lg"
                maxLength={10}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-dark-brown hover:bg-mid-brown text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              View Villa Details
            </button>
          </form>
        </div>
      </div>

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

export default PhoneVerificationPopup;

