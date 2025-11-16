import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ImageComparisonSlider from "../components/ImageComparisonSlider";

gsap.registerPlugin(ScrollTrigger);

const ComparisonSection = () => {
  useGSAP(() => {
    // Animate title on scroll
    gsap.from(".comparison-title", {
      scrollTrigger: {
        trigger: ".comparison-section",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
      y: 100,
      opacity: 0,
    });

    // Animate slider on scroll
    gsap.from(".comparison-slider-wrapper", {
      scrollTrigger: {
        trigger: ".comparison-section",
        start: "top 60%",
        end: "top 20%",
        scrub: 1,
      },
      scale: 0.8,
      opacity: 0,
    });

    // Animate description
    gsap.from(".comparison-description", {
      scrollTrigger: {
        trigger: ".comparison-section",
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
      y: 50,
      opacity: 0,
    });
  }, []);

  return (
    <section id="comparison" className="comparison-section min-h-dvh bg-milk w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 md:py-24">
      {/* Title */}
      <div className="comparison-title text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="general-title text-dark-brown">East vs West</h1>
        <p className="comparison-description font-paragraph text-mid-brown text-base sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-2xl mx-auto">
          Get a glimps of the East and West facing villas at Aarunya.
        </p>
      </div>

      {/* Comparison Slider */}
      <div className="comparison-slider-wrapper w-full max-w-6xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <ImageComparisonSlider
          beforeImage="/images/black.jpg"
          afterImage="/images/white.jpg"
          beforeLabel="East"
          afterLabel="West"
        />
      </div>

      {/* Instructions */}
      <div className="mt-8 sm:mt-12 text-center">
        <p className="font-paragraph text-dark-brown/60 text-sm sm:text-base">
          👆 Drag the slider left or right to compare
        </p>
      </div>
    </section>
  );
};

export default ComparisonSection;
