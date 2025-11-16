import { useMediaQuery } from "react-responsive";
import { nutrientLists } from "../constants";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(nutrientLists);

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientLists.slice(0, 3));
    } else {
      setLists(nutrientLists);
    }
  }, [isMobile]);

  useGSAP(() => {
    // Only run animations on desktop
    if (!isMobile) {
      const titleSplit = SplitText.create(".nutrition-title", {
        type: "chars",
      });
      const paragraphSplit = SplitText.create(".nutrition-paragraph", {
        type: "words, lines",
        linesClass: "paragraph-line",
      });

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".nutrition-section",
          start: "top center",
        },
      });
      contentTl
        .from(titleSplit.chars, {
          yPercent: 100,
          stagger: 0.02,
          ease: "power2.out",
        })
        .from(paragraphSplit.words, {
          yPercent: 300,
          rotate: 3,
          ease: "power1.inOut",
          duration: 1,
          stagger: 0.01,
        });

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".nutrition-section",
          start: "top 80%",
        },
      });

      titleTl.to(".nutrition-text-scroll", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        ease: "power1.inOut",
      });
    }
  }, [isMobile]);

  return (
    <section id="nutrition" className="nutrition-section">
      {/* <img
        src="/images/slider-dip.png"
        alt=""
        className="w-full object-cover"
      /> */}

      <img src="/images/big-img.png" alt="" className="big-img" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch px-4 sm:px-6 md:px-10 mt-6 sm:mt-8 md:mt-10 lg:mt-0 gap-4 sm:gap-6 md:gap-4 pb-[200px] sm:pb-[220px] md:pb-[180px] lg:pb-[200px]">
        {isMobile ? (
          <div className="w-full mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-center">
              Premium Amenities
            </h1>
          </div>
        ) : (
          <div className="relative inline-block w-full md:w-auto md:translate-y-20 translate-y-0">
            <div className="general-title relative flex flex-col justify-center items-center sm:items-start gap-6 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
              <div className="overflow-hidden place-self-center sm:place-self-start">
                <h1 className="nutrition-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[8.5rem] text-center sm:text-left">
                  Premium
                </h1>
              </div>
              <div
                style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                className="nutrition-text-scroll place-self-center sm:place-self-start"
              >
                <div className="bg-yellow-brown pb-2 sm:pb-3 md:pb-4 lg:pb-5 pt-1 sm:pt-2 md:pt-2 lg:pt-0 px-2 sm:px-3 md:px-5 lg:px-8">
                  <h2 className="text-milk-yellow text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                    Amenities
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center md:justify-center items-start md:items-center w-full md:w-auto translate-y-0 md:translate-y-5 mt-4 sm:mt-6 md:mt-0">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-xs lg:max-w-sm">
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-right font-paragraph leading-relaxed ${
                !isMobile ? "nutrition-paragraph" : ""
              }`}
            >
              Experience world-class facilities including 50,000 sq.ft
              clubhouse, swimming pool, gym, spa, temple, and sports courts
              within 500-acre township
            </p>
          </div>
        </div>

        <div className="nutrition-box">
          <div className="list-wrapper">
            {lists.map((nutrient, index) => (
              <div
                key={index}
                className="relative flex-1 min-w-[90px] sm:min-w-[110px] md:min-w-[120px] col-center"
              >
                <div className="text-center">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-paragraph">
                    {nutrient.label}
                  </p>
                  <p className="font-paragraph text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 md:mt-1.5">
                    up to
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight font-bold mt-0.5">
                    {nutrient.amount}
                  </p>
                </div>

                {index !== lists.length - 1 && (
                  <div className="spacer-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
