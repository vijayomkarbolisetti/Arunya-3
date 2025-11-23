import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getVillaById } from "../constants/villaDetails";
import { Icons } from "../components/Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const VillaDetail = () => {
  const { villaId } = useParams();
  const navigate = useNavigate();
  const villa = getVillaById(villaId);
  const containerRef = useRef(null);
  const featuresTrackRef = useRef(null);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [villaId]);

  useGSAP(() => {
    if (!villa) return;

    // Hero Animation - Parallax Effect
    gsap.to(".hero-bg", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".hero-content", {
      yPercent: -50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Sections Scroll Animations (Scrubbing)
    // Overview Text Reveal
    gsap.from(".overview-text", {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".overview-section",
        start: "top bottom", 
        end: "top 20%",
        scrub: 1
      }
    });

    // Features Horizontal Scroll (Desktop)
    if (!isTablet && featuresTrackRef.current) {
      const scrollAmount = featuresTrackRef.current.scrollWidth - window.innerWidth;
      
      gsap.to(featuresTrackRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top top",
          end: `+=${scrollAmount}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    } else {
      // Mobile/Tablet Vertical Stagger
      gsap.from(".feature-card", {
        opacity: 0,
        y: 100,
        scale: 0.9,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top bottom",
          end: "bottom 20%",
          scrub: 1
        }
      });
    }

    // Specs Grid Animation
    gsap.from(".spec-item", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".specs-section",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Floor Plans Slide In
    gsap.from(".floor-plan-item", {
      x: -100,
      opacity: 0,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".floor-plans-section",
        start: "top bottom", 
        end: "bottom 40%",
        scrub: 1
      }
    });

  }, { scope: containerRef, dependencies: [villa, isTablet] });

  if (!villa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main-bg text-milk">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Villa Not Found</h1>
          <button onClick={() => navigate("/")} className="underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full bg-milk overflow-x-hidden">
      {/* Navbar Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-milk pointer-events-none">
        <button 
          onClick={() => navigate("/")}
          className="pointer-events-auto flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          BACK
        </button>
        <img src="/images/nav-logo.svg" alt="Logo" className="w-16 opacity-90" />
      </nav>

      {/* Hero Section - Parallax & Clean */}
      <section className="hero-section relative w-full h-screen overflow-hidden bg-main-bg">
        <div className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]">
          <img 
            src={villa.hero.image} 
            alt={villa.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="hero-content relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-milk text-[12vw] md:text-[10vw] font-bold uppercase leading-[0.8] tracking-tighter mb-4 mix-blend-overlay">
            {villa.name}
          </h1>
          <p className="text-milk text-xl md:text-2xl font-medium tracking-widest uppercase opacity-90">
            {villa.tagline}
          </p>
        </div>
      </section>

      {/* Overview Section - Minimal & Scrubbed */}
      <section className="overview-section min-h-screen flex items-center py-24 px-6 md:px-12 bg-milk">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-24">
          <div className="overview-text">
            <h2 className="text-[4rem] md:text-[6rem] leading-[0.9] font-bold text-dark-brown uppercase mb-8">
              {villa.overview.title}
            </h2>
          </div>
          <div className="overview-text self-end">
            <p className="text-xl md:text-2xl leading-relaxed text-dark-brown/80 font-medium mb-12">
              {villa.overview.description}
            </p>
            <div className="space-y-4 border-t border-dark-brown/20 pt-8">
              {villa.overview.highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-dark-brown rounded-full" />
                  <span className="text-dark-brown text-lg uppercase tracking-wide">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Horizontal Scroll */}
      <section className="features-section h-screen bg-main-bg text-milk overflow-hidden flex flex-col justify-center">
        <div className="w-full pl-6 md:pl-12 mb-12 md:mb-0 md:absolute md:top-12 md:left-0 z-10">
          <h2 className="text-[10vw] md:text-[8vw] leading-none font-bold opacity-20 select-none uppercase">
            Features
          </h2>
        </div>
        
        <div 
          ref={featuresTrackRef}
          className={`flex ${isTablet ? 'flex-col gap-16 px-6 pb-24 pt-12' : 'flex-row gap-24 px-12 items-center h-full w-max'}`}
        >
          {villa.features.map((feature, i) => {
            const IconComponent = Icons[feature.icon];
            return (
              <div key={i} className={`feature-card group ${isTablet ? 'w-full' : 'w-[400px] flex-shrink-0'}`}>
                <div className="mb-8 text-light-brown group-hover:text-white transition-colors duration-500">
                  {IconComponent && <IconComponent className="w-16 h-16" />}
                </div>
                <h3 className="text-3xl font-bold uppercase mb-6 border-b border-white/20 pb-6 group-hover:border-white transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-milk/60 text-xl leading-relaxed group-hover:text-milk/90 transition-colors duration-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Specifications - Grid Scrub */}
      <section className="specs-section py-32 px-6 md:px-12 bg-milk">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dark-brown/10 border border-dark-brown/10">
            {Object.entries(villa.specifications).map(([key, value], i) => (
              <div key={i} className="spec-item bg-milk p-8 md:p-12 flex flex-col justify-between aspect-square hover:bg-white transition-colors duration-500">
                <span className="text-sm font-bold uppercase tracking-widest text-mid-brown">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-dark-brown">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Plans - Slide Scrub */}
      <section className="floor-plans-section py-32 px-6 md:px-12 bg-dark-brown text-milk">
        <div className="max-w-5xl mx-auto space-y-24">
          {villa.floorPlans.map((floor, i) => (
            <div key={i} className="floor-plan-item flex flex-col md:flex-row gap-12 items-start border-b border-white/10 pb-12 last:border-0">
              <div className="md:w-1/3">
                <h3 className="text-5xl font-bold uppercase mb-2">{floor.floor}</h3>
                <span className="text-light-brown text-xl font-mono">{floor.sqft}</span>
              </div>
              <div className="md:w-2/3 grid grid-cols-2 gap-4">
                {floor.features.map((feat, j) => (
                  <span key={j} className="text-lg opacity-70 hover:opacity-100 transition-opacity cursor-default">
                    • {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black py-8 text-center text-white/30 text-sm uppercase tracking-widest">
        <p>© 2025 Aarunya Villas</p>
      </footer>
    </div>
  );
};

export default VillaDetail;
