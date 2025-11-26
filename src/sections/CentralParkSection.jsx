import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const CentralParkSection = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".park-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".park-desc",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".park-card",
          {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          ".park-cta-button",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  const highlights = [
    {
      title: "Bethesda Fountain",
      image:
        "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&h=600&fit=crop",
    },
    {
      title: "Bow Bridge",
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",
    },
    {
      title: "The Great Lawn",
      image:
        "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-950 text-milk py-20 px-4 sm:px-6 md:px-12 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Image with Mask */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1920&h=1080&fit=crop"
          alt="Central Park Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        <h2 className="park-title text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-center mb-6 tracking-tight">
          Central Park
        </h2>
        <p className="park-desc text-lg md:text-xl text-center max-w-2xl mb-16 opacity-80 font-light leading-relaxed">
          Discover America's most iconic urban oasis. From historic landmarks to
          serene landscapes, Central Park offers 843 acres of natural beauty in
          the heart of Manhattan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="park-card group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold uppercase tracking-wider">
                  {item.title}
                </h3>
                <div className="w-12 h-1 bg-emerald-400 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/central-park"
          className="park-cta-button group relative inline-flex items-center gap-4 px-8 py-4 bg-emerald-500 text-white rounded-full overflow-hidden transition-all hover:bg-emerald-400 hover:scale-105"
        >
          <span className="relative z-10 font-bold uppercase tracking-widest text-sm sm:text-base">
            Explore Central Park
          </span>
          <span className="relative z-10 text-xl group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default CentralParkSection;

