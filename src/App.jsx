import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import MarqueeSection from "./sections/MarqueeSection";
import { useMediaQuery } from "react-responsive";
import VillaDetail from "./pages/VillaDetail";
import ClubhousePage from "./pages/ClubhousePage";
import ClubhouseSection from "./sections/ClubhouseSection";
import CentralParkPage from "./pages/CentralParkPage";
import CentralParkSection from "./sections/CentralParkSection";
import ComparisonSection from "./sections/ComparisonSection";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Home Page Component
const HomePage = () => {
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

            <ClubhouseSection />
            <CentralParkSection />
            {/* <ComparisonSection /> */}

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
          <ClubhouseSection />
          <CentralParkSection />
          <ComparisonSection />

          <MarqueeSection />

          <FooterSection />
        </>
      )}
    </main>
  );
};

// Main App Component with Routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/villa/:villaId" element={<VillaDetail />} />
        <Route path="/clubhouse" element={<ClubhousePage />} />
        <Route path="/central-park" element={<CentralParkPage />} />
      </Routes>
    </Router>
  );
};

export default App;
