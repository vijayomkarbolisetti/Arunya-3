import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const FlavorSlider = () => {
  const sliderRef = useRef();
  const navigate = useNavigate();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  // Convert villa name to URL-friendly ID
  const getVillaId = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleVillaClick = (flavor) => {
    const villaId = getVillaId(flavor.name);
    navigate(`/villa/${villaId}`);
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
  );
};

export default FlavorSlider;
