import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import FlavorSectionMobile from "./sections/FlavorSectionMobile";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import ComparisonSection from "./sections/ComparisonSection";
import MarqueeSection from "./sections/MarqueeSection";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1025px)",
  });

  useGSAP(() => {
    // Only enable ScrollSmoother on desktop for better performance
    if (isDesktop) {
      ScrollSmoother.create({
        smooth: 3,
        effects: true,
      });
    }
  }, [isDesktop]);

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <NavBar />
      {isDesktop ? (
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <HeroSection />
            {/* <MessageSection /> */}
            <FlavorSection />
            <NutritionSection />
            <ComparisonSection />
            <MarqueeSection />

            <div>
              <BenefitSection />
              <TestimonialSection />
            </div>

            <FooterSection />
          </div>
        </div>
      ) : (
        <>
          <HeroSection />
          <MessageSection />
          <FlavorSectionMobile />
          <NutritionSection />
          <ComparisonSection />
          <MarqueeSection />

          <FooterSection />
        </>
      )}
    </main>
  );
};

export default App;
