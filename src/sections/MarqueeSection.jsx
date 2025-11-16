import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import MarqueeLogos from "../components/MarqueeLogos";

gsap.registerPlugin(ScrollTrigger);

const MarqueeSection = () => {
  useGSAP(() => {
    gsap.from(".marquee-title", {
      scrollTrigger: {
        trigger: ".marquee-section",
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      },
      y: 80,
      opacity: 0,
    });

    gsap.from(".marquee-container", {
      scrollTrigger: {
        trigger: ".marquee-section",
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
      opacity: 0,
      scale: 0.95,
    });
  }, []);

  return (
    <section id="partners" className="marquee-section min-h-[60vh] bg-dark-brown w-full overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
      {/* Title */}
      <div className="marquee-title text-center mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-milk text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
          Trusted By Industry Leaders
        </h2>
        <p className="font-paragraph text-milk/70 text-base sm:text-lg mt-4 sm:mt-6">
          Partnering with the world's most innovative companies
        </p>
      </div>

      {/* Marquee */}
      <MarqueeLogos />
    </section>
  );
};

export default MarqueeSection;

