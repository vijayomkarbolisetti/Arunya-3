import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getVillaById, villaDetails } from "../constants/villaDetails";
import { Icons } from "../components/Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import FooterSection from "../sections/FooterSection";

gsap.registerPlugin(ScrollTrigger);

const VillaDetail = () => {
  const { villaId } = useParams();
  const navigate = useNavigate();
  const villa = getVillaById(villaId);
  const containerRef = useRef(null);
  const featuresTrackRef = useRef(null);
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determine if we need detailed tabs (e.g. for The Grove where we have multiple plans per variant)
  // or simple tabs (e.g. for Estate where 1 variant = 1 plan)
  const uniqueVariants = [...new Set(villa?.floorPlans?.map(p => p.variant).filter(Boolean))];
  const hasMultiplePlansPerVariant = villa?.floorPlans?.length > uniqueVariants.length;

  const activePlan = villa?.floorPlans?.[activeFloorIndex];

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useEffect(() => {
    // Reset state when villa changes
    setActiveFloorIndex(0);
    setActiveImageIndex(0);
    setIsModalOpen(false);
    setIsMenuOpen(false);

    // Check for floor index in URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const floorIndex = urlParams.get('floorIndex');
    
    if (floorIndex !== null && !isNaN(floorIndex)) {
      const index = parseInt(floorIndex);
      if (index >= 0 && index < villa?.floorPlans?.length) {
        setActiveFloorIndex(index);
        setActiveImageIndex(0); // Reset image index when changing floor plan
      }
    }
    
    // Handle hash navigation
    if (window.location.hash === "#floor-plans") {
      const element = document.getElementById("floor-plans");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [villaId, villa]);

  useGSAP(() => {
    if (!villa) return;

    // Force refresh ScrollTrigger to ensure positions are correct after navigation
    ScrollTrigger.refresh();

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
    <div key={villaId} ref={containerRef} className="w-full bg-milk overflow-x-hidden">
      {/* Navbar Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate("/")}
          className="pointer-events-auto flex items-center gap-2 font-bold text-sm md:text-base bg-black/20 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full hover:bg-black/40 transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          BACK
        </button>
        
        <div className="relative pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <img src="/images/nav-logo.svg" alt="Logo" className="w-16 md:w-20 opacity-100" />
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-dark-brown/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-fade-in flex flex-col">
              {['the-grove', 'the-estate', 'the-courtyard'].map((id) => {
                const v = villaDetails[id];
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      navigate(`/villa/${v.id}`);
                      setIsMenuOpen(false);
                    }}
                    className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wide transition-colors duration-300 border-b border-white/5 last:border-none ${
                      v.id === villaId
                        ? "text-light-brown bg-white/5"
                        : "text-white hover:bg-white/10 hover:text-light-brown"
                    }`}
                  >
                    {v.name}
                  </button>
                );
              })}
            </div>
          )}
          
          {/* Backdrop to close menu */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 z-[-1]" 
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
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

      {/* Floor Plans - Tabbed Interface */}
      <section id="floor-plans" className="floor-plans-section py-32 px-6 md:px-12 bg-dark-brown text-milk">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-12 text-center">Floor Plans</h2>
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {hasMultiplePlansPerVariant ? (
              // Detailed Tabs (e.g. The Grove: Soleil - 1, Soleil - 2, etc.)
              villa.floorPlans.map((plan, i) => {
                // Determine label suffix based on order within the same variant
                const variantPlans = villa.floorPlans.filter(p => p.variant === plan.variant);
                const indexInVariant = variantPlans.indexOf(plan);
                const suffix = indexInVariant + 1;
                const tabLabel = `${plan.variant} - ${suffix}`;

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveFloorIndex(i);
                      setActiveImageIndex(0);
                    }}
                    className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 border-2 ${
                      activeFloorIndex === i
                        ? "bg-white text-dark-brown border-white shadow-lg scale-105"
                        : "bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/40"
                    }`}
                  >
                    {tabLabel}
                  </button>
                );
              })
            ) : (
              // Simple Tabs (e.g. Estate: Soleil, Ember)
              uniqueVariants.map((variant, i) => {
                // Find the index of this variant's plan
                const planIndex = villa.floorPlans.findIndex(p => p.variant === variant);
                const isActive = villa.floorPlans[activeFloorIndex].variant === variant;
                
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveFloorIndex(planIndex);
                      setActiveImageIndex(0);
                    }}
                    className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300 border-2 ${
                      isActive
                        ? "bg-white text-dark-brown border-white shadow-lg scale-105"
                        : "bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/40"
                    }`}
                  >
                    {variant}
                  </button>
                );
              })
            )}
          </div>

          {/* Floor Plan Display */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column - Plan Details (2 cols) */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
              <div className="floor-plan-item">
                {activePlan?.variant && (
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1 bg-light-brown/20 text-light-brown rounded-full text-xs font-bold uppercase tracking-wider">
                      {activePlan.variant} Variant
                    </span>
                  </div>
                )}
                
                {/* Facing Heading (Single) */}
                <div className="flex flex-col gap-2 mb-3">
                  <h3 className="text-3xl md:text-4xl font-bold uppercase mb-3 text-white">
                    {activePlan?.floor}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-light-brown text-xl font-mono">
                    {activePlan?.sqft}
                  </span>
                </div>

                {activePlan?.description && (
                  <p className="text-white/80 text-base mb-6 leading-relaxed">
                    {activePlan.description}
                  </p>
                )}

                <div className="space-y-3 border-t border-white/20 pt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {activePlan?.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-light-brown rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Floor Plan Image Carousel (3 cols) */}
            <div className="lg:col-span-3 floor-plan-item">
              <div className="bg-black/20 rounded-2xl overflow-hidden border border-white/10 relative group aspect-[4/3] lg:aspect-auto lg:h-[600px]">
                <div 
                   className="absolute inset-0 flex items-center justify-center p-8 pb-24 cursor-zoom-in"
                   onClick={() => setIsModalOpen(true)}
                >
                  {(() => {
                    const currentPlan = villa.floorPlans[activeFloorIndex];
                    const images = Array.isArray(currentPlan.images) ? currentPlan.images : [{ label: currentPlan.floor, image: currentPlan.image }];
                    const currentImage = images[activeImageIndex] || images[0];
                    
                    return (
                      <img 
                        key={`${activeFloorIndex}-${activeImageIndex}`}
                        src={currentImage.image} 
                        alt={`${currentPlan.variant ? currentPlan.variant + ' - ' : ''}${currentImage.label || currentPlan.floor}`}
                        className="w-full h-full object-contain animate-fade-in"
                      />
                    );
                  })()}
                </div>
                
                {/* Floor Label Overlay */}
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <span className="text-white font-mono text-xs">
                    {(() => {
                      const currentPlan = villa.floorPlans[activeFloorIndex];
                      const images = Array.isArray(currentPlan.images) ? currentPlan.images : [{ label: currentPlan.floor }];
                      return images[activeImageIndex]?.label || currentPlan.floor;
                    })()}
                  </span>
                </div>

                {/* Plan Counter */}
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <span className="text-white font-mono text-xs">
                    {(() => {
                      const currentPlan = villa.floorPlans[activeFloorIndex];
                      const images = Array.isArray(currentPlan.images) ? currentPlan.images : [currentPlan.image];
                      return `${activeImageIndex + 1} OF ${images.length}`;
                    })()}
                  </span>
                </div>

                {/* Image Navigation Arrows */}
                {(() => {
                  const currentPlan = villa.floorPlans[activeFloorIndex];
                  const images = Array.isArray(currentPlan.images) ? currentPlan.images : [currentPlan.image];
                  
                  if (images.length > 1) {
                    return (
                      <>
                        <button
                          onClick={() => {
                            setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="Previous floor"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => {
                            setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="Next floor"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </>
                    );
                  }
                  return null;
                })()}

                {/* Floor Thumbnail Previews */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                  {(() => {
                    const currentPlan = villa.floorPlans[activeFloorIndex];
                    const images = Array.isArray(currentPlan.images) ? currentPlan.images : [{ image: currentPlan.image, label: currentPlan.floor }];
                    
                    return images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative group/thumb transition-all duration-300 ${
                          activeImageIndex === idx
                            ? "scale-110"
                            : "scale-100 hover:scale-105"
                        }`}
                        aria-label={`View ${img.label || `floor ${idx + 1}`}`}
                      >
                        <div className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          activeImageIndex === idx
                            ? "border-white shadow-lg shadow-white/50"
                            : "border-white/30 hover:border-white/60"
                        }`}>
                          <img
                            src={img.image}
                            alt={img.label}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                            activeImageIndex === idx
                              ? "opacity-0"
                              : "opacity-40 group-hover/thumb:opacity-20"
                          }`} />
                        </div>
                        {/* Label */}
                        <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold transition-all duration-300 ${
                          activeImageIndex === idx
                            ? "text-white"
                            : "text-white/60 group-hover/thumb:text-white/80"
                        }`}>
                          {img.label}
                        </div>
                      </button>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-light-brown transition-colors z-50 bg-black/50 p-2 rounded-full border border-white/10"
            onClick={() => setIsModalOpen(false)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div 
            className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const currentPlan = villa.floorPlans[activeFloorIndex];
              const images = Array.isArray(currentPlan.images) ? currentPlan.images : [{ label: currentPlan.floor, image: currentPlan.image }];
              const currentImage = images[activeImageIndex] || images[0];
              
              return (
                <img 
                  src={currentImage.image} 
                  alt={currentImage.label || currentPlan.floor}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
              );
            })()}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-sm">
              {(() => {
                const currentPlan = villa.floorPlans[activeFloorIndex];
                const images = Array.isArray(currentPlan.images) ? currentPlan.images : [{ label: currentPlan.floor }];
                return images[activeImageIndex]?.label || currentPlan.floor;
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VillaDetail;
