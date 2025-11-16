import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import theme from "../constants/theme";

const MessageSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", {
      type: "words",
    });
    const secMsgSplit = SplitText.create(".second-message", {
      type: "words",
    });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    gsap.to(firstMsgSplit.words, {
      color: theme.presets.messageSection.text,
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".message-content",
        start: "top center",
        end: "30% center",
        scrub: true,
      },
    });
    gsap.to(secMsgSplit.words, {
      color: theme.presets.messageSection.text,
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".second-message",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 60%",
      },
    });
    revealTl.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
    });

    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top center",
      },
    });
    paragraphTl.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.01,
    });
  });

  return (
    <section id="message" className="message-content">
      <div className="w-full mx-auto flex-center py-16 sm:py-20 md:py-24 lg:py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">
              Where luxury meets tranquility and
            </h1>

            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown pb-3 sm:pb-4 md:pb-5 px-3 sm:px-4 md:px-5">
                <h2 className="text-red-brown">Nature Thrives</h2>
              </div>
            </div>

            <h1 className="second-message">
              in every corner of your dream home at Aarunya
            </h1>
          </div>

          <div className="flex-center mt-8 sm:mt-10 md:mt-16 lg:mt-20">
            <div className="max-w-xs sm:max-w-sm md:max-w-md px-6 sm:px-8 md:px-10 flex-center overflow-hidden">
              <p>
                Embrace a lifestyle of elegance and serenity at Greenrich
                Highlands, where every sunrise brings new possibilities and
                every sunset paints memories in your luxurious villa sanctuary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
