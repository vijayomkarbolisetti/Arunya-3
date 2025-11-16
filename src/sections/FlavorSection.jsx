import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";

const FlavorSection = () => {
  return (
    <section id="flavors" className="flavor-section">
      <div className="h-full w-full flex flex-col">
        {/* Title - Always visible at top */}
        <div className="w-full h-auto py-8 sm:py-12 md:py-16 lg:py-20 flex items-center justify-center px-4 sm:px-6 md:px-8">
          <FlavorTitle />
        </div>
        
        {/* Slider - Scrolls horizontally */}
        <div className="w-full h-auto lg:h-dvh">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
