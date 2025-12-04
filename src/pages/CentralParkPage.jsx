import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import NavBar from "../components/NavBar";
import FooterSection from "../sections/FooterSection";
import { SplitText } from "gsap/all";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AttractionPanel = ({ attraction, index }) => {
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
      gsap.from(panel.querySelector(".attraction-image"), {
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
      gsap.from(panel.querySelector(".attraction-text"), {
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
      className="attraction-panel min-h-[80vh] grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Image Area */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl group ${
          index % 2 === 1 ? "md:order-2" : ""
        }`}
      >
        <div className="attraction-image w-full h-full">
          <img
            src={attraction.tabs ? attraction.tabs[activeTab].image : attraction.image}
            alt={attraction.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Text Details */}
      <div
        className={`space-y-8 attraction-text ${
          index % 2 === 1 ? "md:order-1" : ""
        }`}
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-2">
            {attraction.label}
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-dark-brown mb-6 leading-tight">
            {attraction.title}
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mb-8" />
          <p className="text-xl text-gray-600 leading-relaxed">
            {attraction.description}
          </p>
        </div>

        {attraction.tabs ? (
          <div className="space-y-4">
            {attraction.tabs.map((tab, i) => (
              <div
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-4 text-xl font-medium cursor-pointer transition-colors duration-300 ${
                  activeTab === i
                    ? "text-emerald-800"
                    : "text-gray-400 hover:text-emerald-600"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
                    activeTab === i
                      ? "bg-emerald-600 text-white"
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
            {attraction.features.map((feature, i) => (
              <li
                key={i}
                className="feature-item flex items-center gap-4 text-xl font-medium text-dark-brown"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold">
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

const CentralParkPage = () => {
  const containerRef = useRef(null);
  const attractionsContainerRef = useRef(null);

  const attractions = [
    {
      id: 0,
      label: "Historic Landmark",
      title: "Bethesda Fountain",
      description:
        "One of the park's most iconic landmarks, Bethesda Fountain sits at the heart of the park overlooking the Lake. The Angel of the Waters statue crowns this beautiful centerpiece, unveiled in 1873.",
      features: [
        "Angel of the Waters Statue",
        "Terrace Overlook",
        "Beautiful Tile Ceiling",
        "Lake Views",
      ],
      tabs: [
        {
          name: "Angel of the Waters Statue",
          image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&h=800&fit=crop"
        },
        {
          name: "Terrace Overlook",
          image: "https://images.unsplash.com/photo-1585594787640-c752636a04cb?w=1200&h=800&fit=crop"
        },
        {
          name: "Beautiful Tile Ceiling",
          image: "https://images.unsplash.com/photo-1575372587522-62464735a225?w=1200&h=800&fit=crop"
        },
        {
          name: "Lake Views",
          image: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=1200&h=800&fit=crop"
        }
      ],
      image:
        "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&h=800&fit=crop",
    },
    {
      id: 1,
      label: "Romantic Bridge",
      title: "Bow Bridge",
      description:
        "An architectural masterpiece and one of the most photographed locations in the park. This cast-iron bridge spans 60 feet across the Lake, offering stunning views of the New York skyline.",
      features: [
        "Cast-Iron Design",
        "360-Degree Views",
        "Perfect Photo Spot",
        "Sunset Views",
      ],
      tabs: [
        {
          name: "Cast-Iron Design",
          image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&h=800&fit=crop"
        },
        {
          name: "360-Degree Views",
          image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=1200&h=800&fit=crop"
        },
        {
          name: "Perfect Photo Spot",
          image: "https://images.unsplash.com/photo-1543430720-fa600c67e423?w=1200&h=800&fit=crop"
        },
        {
          name: "Sunset Views",
          image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=1200&h=800&fit=crop"
        }
      ],
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&h=800&fit=crop",
    },
    {
      id: 2,
      label: "Peaceful Memorial",
      title: "Strawberry Fields",
      description:
        "A living memorial to John Lennon, this 2.5-acre landscaped section features the iconic 'Imagine' mosaic. It's a place of reflection and international peace, donated by Yoko Ono.",
      features: [
        "Imagine Mosaic",
        "International Garden",
        "Memorial Benches",
        "Quiet Reflection Space",
      ],
      tabs: [
        {
          name: "Imagine Mosaic",
          image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop"
        },
        {
          name: "International Garden",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=800&fit=crop"
        },
        {
          name: "Memorial Benches",
          image: "https://images.unsplash.com/photo-1519331379826-f94911d94c6c?w=1200&h=800&fit=crop"
        },
        {
          name: "Quiet Reflection Space",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop"
        }
      ],
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop",
    },
    {
      id: 3,
      label: "Urban Oasis",
      title: "The Great Lawn",
      description:
        "Spanning 55 acres, the Great Lawn is the park's premier destination for relaxation and recreation. Host to legendary concerts and countless picnics, it's the green heart of Manhattan.",
      features: [
        "55 Acres of Green Space",
        "Baseball Fields",
        "Concert Venue",
        "Picnic Paradise",
      ],
      tabs: [
        {
          name: "55 Acres of Green Space",
          image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=1200&h=800&fit=crop"
        },
        {
          name: "Baseball Fields",
          image: "https://images.unsplash.com/photo-1531819177119-43b90ab329cf?w=1200&h=800&fit=crop"
        },
        {
          name: "Concert Venue",
          image: "https://images.unsplash.com/photo-1459749411177-0473ef7161a8?w=1200&h=800&fit=crop"
        },
        {
          name: "Picnic Paradise",
          image: "https://images.unsplash.com/photo-1596321617260-262137424d8b?w=1200&h=800&fit=crop"
        }
      ],
      image:
        "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=1200&h=800&fit=crop",
    },
    {
      id: 4,
      label: "Nature Sanctuary",
      title: "The Ramble",
      description:
        "A 38-acre woodland within the park, the Ramble offers winding paths, rustic bridges, and some of the best bird-watching in New York City. Over 230 species have been spotted here.",
      features: [
        "38 Acres of Woodland",
        "Bird Watching Paradise",
        "Winding Paths",
        "Natural Habitat",
      ],
      tabs: [
        {
          name: "38 Acres of Woodland",
          image: "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?w=1200&h=800&fit=crop"
        },
        {
          name: "Bird Watching Paradise",
          image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=1200&h=800&fit=crop"
        },
        {
          name: "Winding Paths",
          image: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&h=800&fit=crop"
        },
        {
          name: "Natural Habitat",
          image: "https://images.unsplash.com/photo-1501854140884-074bf64cad1c?w=1200&h=800&fit=crop"
        }
      ],
      image:
        "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&h=800&fit=crop",
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

      // Stats Counter Animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // Activities Horizontal Scroll
      const activitySections = gsap.utils.toArray(".activity-panel");
      gsap.to(activitySections, {
        xPercent: -100 * (activitySections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".activities-scroll-section",
          pin: true,
          scrub: 1,
          snap: 1 / (activitySections.length - 1),
          end: () =>
            "+=" +
            document.querySelector(".activities-scroll-section").offsetWidth *
              2,
        },
      });

      // Timeline Scroll Animation
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 60%",
        },
        x: -100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="w-full bg-white min-h-screen overflow-hidden"
    >
      <NavBar />

      <Link
        to="/"
        className="fixed top-28 sm:top-36 left-4 sm:left-6 z-50 bg-milk/80 backdrop-blur-md shadow-sm rounded-md px-4 py-3 sm:py-3.5 text-dark-brown font-bold uppercase text-xs sm:text-sm tracking-widest hover:bg-white transition-all flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-300">
          ←
        </span>{" "}
        Back to Home
      </Link>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1920&h=1080&fit=crop"
            alt="Central Park Hero"
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-main-bg"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="hero-title text-[12vw] leading-[0.8] font-bold text-milk uppercase tracking-tighter mix-blend-overlay">
            Central Park
          </h1>
          <p className="text-xl md:text-2xl text-milk font-light tracking-widest mt-8 uppercase opacity-90">
            New York's Urban Sanctuary
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section bg-emerald-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">843</div>
              <div className="text-sm md:text-base uppercase tracking-wider opacity-80">
                Acres
              </div>
            </div>
            <div className="stat-item text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">42M</div>
              <div className="text-sm md:text-base uppercase tracking-wider opacity-80">
                Annual Visitors
              </div>
            </div>
            <div className="stat-item text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">1857</div>
              <div className="text-sm md:text-base uppercase tracking-wider opacity-80">
                Established
              </div>
            </div>
            <div className="stat-item text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">230+</div>
              <div className="text-sm md:text-base uppercase tracking-wider opacity-80">
                Bird Species
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section bg-white text-dark-brown py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="intro-text text-2xl md:text-4xl font-light leading-relaxed">
            Central Park is the first landscaped public park in the United
            States. Designed by Frederick Law Olmsted and Calvert Vaux, this
            843-acre urban oasis welcomes over 42 million visitors annually,
            making it the most visited urban park in America.
          </p>
        </div>
      </section>

      {/* Attractions Explorer Section - Scroll Triggered with Parallax */}
      <section
        ref={attractionsContainerRef}
        className="bg-gradient-to-b from-white to-gray-50 text-dark-brown py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-dark-brown mb-4">
              Iconic Landmarks
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Scroll to discover the legendary attractions that define Central
              Park
            </p>
          </div>

          {/* Attraction Panels */}
          <div className="space-y-48 md:space-y-64">
            {attractions.map((attraction, index) => (
              <AttractionPanel key={attraction.id} attraction={attraction} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Activities Horizontal Scroll Section */}
      <section className="activities-scroll-section h-screen bg-emerald-950 overflow-hidden flex items-center">
        <div className="flex h-full w-[400vw] md:w-[300vw]">
          {/* Panel 1: Boating */}
          <div className="activity-panel w-screen h-full flex relative">
            <div className="w-full md:w-1/2 h-full bg-emerald-900 flex items-center justify-center p-12 md:p-24">
              <div className="text-white max-w-xl">
                <h2 className="text-[10vw] md:text-[5vw] leading-none font-bold opacity-20 mb-8">
                  01
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6">
                  Boating
                </h3>
                <p className="text-xl opacity-80 leading-relaxed">
                  Rent a rowboat and glide across the tranquil waters of the
                  Lake. Experience Central Park from a unique perspective
                  surrounded by nature.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full relative">
              <img
                src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Boating"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* Panel 2: Running */}
          <div className="activity-panel w-screen h-full flex relative">
            <div className="w-full md:w-1/2 h-full bg-emerald-700 flex items-center justify-center p-12 md:p-24">
              <div className="text-white max-w-xl">
                <h2 className="text-[10vw] md:text-[5vw] leading-none font-bold opacity-20 mb-8">
                  02
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6">
                  Running & Cycling
                </h3>
                <p className="text-xl opacity-80 leading-relaxed">
                  The 6-mile loop around Central Park is a favorite among
                  runners and cyclists. Enjoy scenic routes away from city
                  traffic.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full relative">
              <img
                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Running"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* Panel 3: Picnicking */}
          <div className="activity-panel w-screen h-full flex relative">
            <div className="w-full md:w-1/2 h-full bg-emerald-600 flex items-center justify-center p-12 md:p-24">
              <div className="text-white max-w-xl">
                <h2 className="text-[10vw] md:text-[5vw] leading-none font-bold opacity-20 mb-8">
                  03
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6">
                  Picnicking
                </h3>
                <p className="text-xl opacity-80 leading-relaxed">
                  Spread a blanket on the Great Lawn or Sheep Meadow and enjoy a
                  perfect afternoon. It's the quintessential New York
                  experience.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full relative">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Picnicking"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Experiences Section */}
      <section className="timeline-section bg-white text-dark-brown py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2 className="text-5xl md:text-7xl font-bold text-center mb-20">
            A Park For All Seasons
          </h2>

          <div className="space-y-12">
            <div className="timeline-item flex gap-8 items-start">
              <div className="flex-shrink-0 w-32 text-4xl font-bold text-emerald-600">
                Spring
              </div>
              <div className="flex-1 border-l-4 border-emerald-500 pl-8 pb-12">
                <h3 className="text-2xl font-bold mb-2">
                  Cherry Blossoms & Renewal
                </h3>
                <p className="text-gray-600 text-lg">
                  Watch as the park awakens with vibrant cherry blossoms and
                  thousands of daffodils. The Conservatory Garden becomes a
                  spectacular display of spring flowers, drawing photographers
                  and nature lovers alike.
                </p>
              </div>
            </div>

            <div className="timeline-item flex gap-8 items-start">
              <div className="flex-shrink-0 w-32 text-4xl font-bold text-emerald-600">
                Summer
              </div>
              <div className="flex-1 border-l-4 border-emerald-500 pl-8 pb-12">
                <h3 className="text-2xl font-bold mb-2">Concerts & Culture</h3>
                <p className="text-gray-600 text-lg">
                  Experience free Shakespeare performances at the Delacorte
                  Theater, catch a symphony at SummerStage, or simply lounge on
                  the Great Lawn. Summer transforms the park into Manhattan's
                  premiere entertainment venue.
                </p>
              </div>
            </div>

            <div className="timeline-item flex gap-8 items-start">
              <div className="flex-shrink-0 w-32 text-4xl font-bold text-emerald-600">
                Fall
              </div>
              <div className="flex-1 border-l-4 border-emerald-500 pl-8 pb-12">
                <h3 className="text-2xl font-bold mb-2">Golden Foliage</h3>
                <p className="text-gray-600 text-lg">
                  Witness the spectacular transformation as trees display
                  brilliant reds, oranges, and golds. The Mall's American elms
                  create a natural cathedral of autumn colors, perfect for
                  romantic strolls and photography.
                </p>
              </div>
            </div>

            <div className="timeline-item flex gap-8 items-start">
              <div className="flex-shrink-0 w-32 text-4xl font-bold text-emerald-600">
                Winter
              </div>
              <div className="flex-1 border-l-4 border-emerald-500 pl-8 pb-12">
                <h3 className="text-2xl font-bold mb-2">Magical Wonderland</h3>
                <p className="text-gray-600 text-lg">
                  Glide across Wollman Rink with the city skyline as your
                  backdrop. Fresh snow transforms the park into a serene winter
                  paradise, while cozy horse-drawn carriage rides offer timeless
                  romance through the frosty landscape.
                </p>
              </div>
            </div>

            <div className="timeline-item flex gap-8 items-start">
              <div className="flex-shrink-0 w-32 text-4xl font-bold text-emerald-600">
                Every Day
              </div>
              <div className="flex-1 border-l-4 border-emerald-500 pl-8">
                <h3 className="text-2xl font-bold mb-2">Your Urban Escape</h3>
                <p className="text-gray-600 text-lg">
                  From sunrise yoga sessions to sunset reflections, Central Park
                  offers daily moments of tranquility amidst the bustling city.
                  Whether you're a morning jogger, lunch-break walker, or
                  evening dreamer, the park welcomes you home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default CentralParkPage;
