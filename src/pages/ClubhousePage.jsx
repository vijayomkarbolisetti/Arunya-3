import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import NavBar from "../components/NavBar";
import FooterSection from "../sections/FooterSection";
import { SplitText } from "gsap/all";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const FloorPanel = ({ floor, index }) => {
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  useGSAP(
    () => {
      const panel = panelRef.current;

      // Panel Scroll Animation
      gsap.fromTo(
        panel,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate image
      gsap.from(panel.querySelector(".floor-image"), {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
          trigger: panel,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // Animate text content
      gsap.from(panel.querySelector(".floor-text"), {
        x: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: panel,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
      });
    },
    { scope: panelRef }
  );

  return (
    <div
      ref={panelRef}
      className="floor-panel min-h-[70vh] grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Image Area */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl group floor-image ${
          index % 2 === 1 ? "md:order-2" : ""
        }`}
      >
        <img
          src={floor.tabs ? floor.tabs[activeTab].image : floor.image}
          alt={floor.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Floor Number Badge */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg">
          <span className="text-4xl font-bold text-dark-brown">
            {floor.id === 4 ? "T" : floor.id}
          </span>
        </div>
      </div>

      {/* Text Details */}
      <div
        className={`space-y-8 floor-text ${
          index % 2 === 1 ? "md:order-1" : ""
        }`}
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-light-brown mb-2">
            {floor.label}
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-dark-brown mb-6 leading-tight">
            {floor.title}
          </h2>
          <div className="w-24 h-1 bg-light-brown mb-8" />
          <p className="text-xl text-gray-600 leading-relaxed">
            {floor.description}
          </p>
        </div>

        {floor.tabs ? (
          <div className="space-y-4">
            {floor.tabs.map((tab, i) => (
              <div
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-4 text-xl font-medium cursor-pointer transition-colors duration-300 ${
                  activeTab === i
                    ? "text-dark-brown"
                    : "text-gray-400 hover:text-light-brown"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
                    activeTab === i
                      ? "bg-light-brown text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1}
                </span>
                {tab.name}
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {floor.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-xl font-medium text-dark-brown"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-light-brown/20 flex items-center justify-center text-light-brown font-bold">
                  {i + 1}
                </span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ClubhousePage = () => {
  const containerRef = useRef(null);
  const floorsContainerRef = useRef(null);

  const floors = [
    {
      id: 0,
      label: "Ground Floor",
      title: "Ground Floor",
      description:
        "Celebrate grand events in style, leave your little ones in expert care, or unwind in our breathtaking swimming pool.",
      features: [
        "Swimming Pool",
        "Pre-Function Area",
        "Provisional Store",
        "Banquet Hall",
      ],
      tabs: [
        {
          name: "Swimming Pool",
          image:
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=800&fit=crop",
        },
        {
          name: "Pre-Function Area",
          image:
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop",
        },
        {
          name: "Provisional Store",
          image:
            "https://images.unsplash.com/photo-1604719312566-b7cb9663483b?w=1200&h=800&fit=crop",
        },
        {
          name: "Banquet Hall",
          image:
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=800&fit=crop",
    },
    {
      id: 1,
      label: "1st Floor",
      title: "First Floor",
      description:
        "A dedicated space for entertainment and relaxation, featuring guest suites for your loved ones.",
      features: ["Mini Theatre", "Guest Suites", "Lounge Area", "Coffee Shop"],
      tabs: [
        {
          name: "Mini Theatre",
          image:
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop",
        },
        {
          name: "Guest Suites",
          image:
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=800&fit=crop",
        },
        {
          name: "Lounge Area",
          image:
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop",
        },
        {
          name: "Coffee Shop",
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&h=800&fit=crop",
    },
    {
      id: 2,
      label: "2nd Floor",
      title: "Second Floor",
      description:
        "Engage in spirited competition or practice your swing in our indoor sports facilities.",
      features: [
        "Indoor Badminton",
        "Squash Court",
        "Table Tennis",
        "Billiards",
      ],
      tabs: [
        {
          name: "Indoor Badminton",
          image:
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=800&fit=crop",
        },
        {
          name: "Squash Court",
          image:
            "https://images.unsplash.com/photo-1505250469679-253c737ef063?w=1200&h=800&fit=crop",
        },
        {
          name: "Table Tennis",
          image:
            "https://images.unsplash.com/photo-1534158914592-062992bbe900?w=1200&h=800&fit=crop",
        },
        {
          name: "Billiards",
          image:
            "https://images.unsplash.com/photo-1585671960231-97e5a0459583?w=1200&h=800&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=800&fit=crop",
    },
    {
      id: 3,
      label: "3rd Floor",
      title: "Third Floor",
      description:
        "Elevate your wellness journey with world-class fitness and rejuvenation centers.",
      features: ["Gymnasium", "Yoga / Aerobics", "Spa & Sauna", "Health Cafe"],
      tabs: [
        {
          name: "Gymnasium",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
        },
        {
          name: "Yoga / Aerobics",
          image:
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&h=800&fit=crop",
        },
        {
          name: "Spa & Sauna",
          image:
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=800&fit=crop",
        },
        {
          name: "Health Cafe",
          image:
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=800&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
    },
    {
      id: 4,
      label: "Terrace",
      title: "Terrace Level",
      description:
        "Experience the sky like never before with our infinity pool and observation deck.",
      features: [
        "Infinity Pool",
        "Sky Deck",
        "Barbeque Station",
        "Stargazing Point",
      ],
      tabs: [
        {
          name: "Infinity Pool",
          image:
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=800&fit=crop",
        },
        {
          name: "Sky Deck",
          image:
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&h=800&fit=crop",
        },
        {
          name: "Barbeque Station",
          image:
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop",
        },
        {
          name: "Stargazing Point",
          image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop",
        },
      ],
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      // Hero Title Animation
      const titleSplit = SplitText.create(".hero-title", {
        type: "chars",
      });

      gsap.from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2,
      });

      // Intro Text Reveal
      gsap.from(".intro-text", {
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // Amenities Horizontal Scroll
      const sections = gsap.utils.toArray(".amenity-panel");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".amenities-scroll-section",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () =>
            "+=" +
            document.querySelector(".amenities-scroll-section").offsetWidth,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="w-full bg-main-bg min-h-screen overflow-hidden"
    >
      <NavBar />
      
      <Link 
        to="/" 
        className="fixed top-28 sm:top-36 left-4 sm:left-6 z-50 bg-milk/80 backdrop-blur-md shadow-sm rounded-md px-4 py-3 sm:py-3.5 text-dark-brown font-bold uppercase text-xs sm:text-sm tracking-widest hover:bg-white transition-all flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Home
      </Link>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop"
            alt="Clubhouse Hero"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-main-bg"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title text-[12vw] leading-[0.8] font-bold text-milk uppercase tracking-tighter mix-blend-overlay">
            The Clubhouse
          </h1>
          <p className="text-xl md:text-2xl text-milk font-light tracking-widest mt-8 uppercase opacity-90">
            Clubhouse & Recreation
          </p>
        </div>
      </section>

      {/* Floor Explorer Section - Scroll Triggered */}
      <section
        ref={floorsContainerRef}
        className="bg-white text-dark-brown py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-dark-brown mb-4">
              Explore Each Floor
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Scroll to discover the luxurious amenities on every level
            </p>
          </div>

          {/* Floor Panels */}
          <div className="space-y-32 md:space-y-48">
            {floors.map((floor, index) => (
              <FloorPanel key={floor.id} floor={floor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Horizontal Scroll Section */}
      <section className="amenities-scroll-section h-screen bg-dark-brown overflow-hidden flex items-center">
        <div className="flex h-full w-[400vw] md:w-[300vw]">
          {" "}
          {/* Width depends on number of panels */}
          {/* Panel 1: Gym */}
          <div className="amenity-panel w-screen h-full flex relative">
            <div className="w-full md:w-1/2 h-full bg-main-bg flex items-center justify-center p-12 md:p-24">
              <div className="text-milk max-w-xl">
                <h2 className="text-[10vw] md:text-[5vw] leading-none font-bold opacity-20 mb-8">
                  01
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6">
                  Gymnasium
                </h3>
                <p className="text-xl opacity-80 leading-relaxed">
                  State-of-the-art equipment for your fitness journey. Panoramic
                  views while you workout.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full relative">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Gym"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
          {/* Panel 2: Yoga */}
          <div className="amenity-panel w-screen h-full flex relative">
            <div className="w-full md:w-1/2 h-full bg-light-brown flex items-center justify-center p-12 md:p-24">
              <div className="text-milk max-w-xl">
                <h2 className="text-[10vw] md:text-[5vw] leading-none font-bold opacity-20 mb-8">
                  02
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6">
                  Yoga & Meditation
                </h3>
                <p className="text-xl opacity-80 leading-relaxed">
                  Find your inner peace in our dedicated silent zones. Designed
                  for tranquility and mindfulness.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full relative">
              <img
                src="https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&h=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Yoga"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
          {/* Panel 3: Kids Area */}
          <div className="amenity-panel w-screen h-full flex relative">
            <div className="w-full md:w-1/2 h-full bg-milk flex items-center justify-center p-12 md:p-24">
              <div className="text-dark-brown max-w-xl">
                <h2 className="text-[10vw] md:text-[5vw] leading-none font-bold opacity-20 mb-8">
                  03
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6">
                  Kids Play Area
                </h3>
                <p className="text-xl opacity-80 leading-relaxed">
                  Safe, engaging, and fun. A colorful world for your little ones
                  to explore and make friends.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full relative">
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&h=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Kids Area"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default ClubhousePage;
