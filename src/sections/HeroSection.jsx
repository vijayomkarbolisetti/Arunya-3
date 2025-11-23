import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const scrollToFlavors = () => {
    const element = document.getElementById("flavors");
    if (element) {
      // Get the element's position
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      // Scroll to a position slightly before the section to trigger animations
      const offsetPosition = elementPosition - window.innerHeight * 0.3; // 30% from top

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="hero" className="bg-main-bg w-full overflow-hidden">
      <div className="hero-container">
        {isTablet ? (
          <img
            src="/images/big-img.jpg"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            src="/videos/hero-bg.webm"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Black overlay mask */}
        <div className="absolute inset-0 bg-black/50 z-[1]"></div>
        <div className="hero-content opacity-0 relative z-[2]">
          <div className="overflow-hidden w-full flex justify-center">
            <h1 className={`hero-title ${isTablet ? "!text-white" : ""}`}>
              Halcyon Lifestyle Redefined
            </h1>
          </div>
          {/* <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Aarunya Villas</h1>
            </div>
          </div> */}
          <h2 className="text-white">
            Experience sunrise-facing luxury villas at Greenrich Highlands. 322
            exclusive homes nestled in 45 acres of tranquil paradise.
          </h2>
          <button className="hero-button" onClick={scrollToFlavors}>
            Explore Villas
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
