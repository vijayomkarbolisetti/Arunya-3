import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";

const FlavorSection = () => {
  return (
    <section id="flavors" className="flavor-section">
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* Title - Left side on large screens */}
        <div className="w-full lg:w-[35%] h-auto lg:h-dvh py-8 sm:py-12 md:py-16 lg:py-0 flex items-center justify-center px-4 sm:px-6 md:px-8 relative">
          <FlavorTitle />
        </div>
        
        {/* Slider - Right side on large screens */}
        <div className="w-full lg:w-[65%] h-auto lg:h-dvh relative z-10">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
