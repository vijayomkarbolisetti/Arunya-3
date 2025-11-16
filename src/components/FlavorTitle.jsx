import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const FlavorTitle = () => {
  useGSAP(() => {
    const firstTextSplit = SplitText.create(".first-text-split h1", {
      type: "chars",
    });
    const secondTextSplit = SplitText.create(".second-text-split h1", {
      type: "chars",
    });

    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 30%",
      },
    });

    gsap.to(".flavor-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 10%",
      },
    });

    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 1%",
      },
    });
  });

  return (
    <div className="general-title col-center h-full gap-6 sm:gap-10 md:gap-14 xl:gap-20 2xl:gap-28 justify-center px-4 sm:px-6 md:px-8">
      <div className="overflow-hidden py-2 sm:py-3 2xl:py-0 first-text-split flex justify-center">
        <h1 className="text-center whitespace-nowrap">Discover </h1>
      </div>

      <div
        style={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        }}
        className="flavor-text-scroll"
      >
        <div className="bg-mid-brown pb-3 sm:pb-4 md:pb-5 pt-2 sm:pt-3 2xl:pt-0 px-3 sm:px-4 md:px-5 2xl:px-5">
          <h2 className="text-milk">exquisite</h2>
        </div>
      </div>

      <div className="overflow-hidden py-2 sm:py-3  second-text-split flex justify-center">
        <h1 className="text-center whitespace-nowrap mt-12">villas</h1>
      </div>
    </div>
  );
};

export default FlavorTitle;
