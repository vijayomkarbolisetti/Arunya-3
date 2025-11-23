import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ClubhouseSection = () => {
  useGSAP(() => {
    gsap.from(".clubhouse-title", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".clubhouse-section",
        start: "top 80%",
      },
    });

    gsap.from(".clubhouse-content", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: ".clubhouse-section",
        start: "top 80%",
      },
    });
  });

  return (
    <section id="clubhouse" className="clubhouse-section min-h-screen bg-main-bg text-milk py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern or Texture placeholder */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

      <h2 className="clubhouse-title text-[12vw] md:text-[8vw] font-bold uppercase mb-12 text-center leading-[0.8] tracking-tighter">
        Club<br/>House
      </h2>
      
      <div className="clubhouse-content max-w-3xl text-center space-y-8 relative z-10">
        <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
          A sanctuary of leisure and luxury. Immerse yourself in a world of curated amenities designed for the discerning few.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12">
          {["Swimming Pool", "Gymnasium", "Indoor Games", "Banquet Hall", "Library", "Yoga Deck"].map((item, i) => (
            <div key={i} className="p-4 border border-milk/20 hover:bg-milk/10 transition-colors duration-300 rounded-lg">
              <p className="uppercase tracking-widest text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubhouseSection;

