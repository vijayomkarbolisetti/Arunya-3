import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {
  const vdRef = useRef([]);

  useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  const villaImages = [
    { img: '/images/4.jpg', name: 'Villa View 1', rotation: 'rotate-z-[-10deg]', translation: 'translate-y-[-5%]' },
    { img: '/images/6.jpg', name: 'Villa View 2', rotation: 'rotate-z-[4deg]', translation: '' },
    { img: '/images/8.jpg', name: 'Villa View 3', rotation: 'rotate-z-[-4deg]', translation: 'translate-y-[-5%]' },
    { img: '/images/9.jpg', name: 'Villa View 4', rotation: 'rotate-z-[4deg]', translation: 'translate-y-[5%]' },
    { img: '/images/12.jpg', name: 'Villa View 5', rotation: 'rotate-z-[-10deg]', translation: '' },
  ];

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">Explore Our</h1>
        <h1 className="text-light-brown sec-title">Luxury</h1>
        <h1 className="text-black third-title">Villas</h1>
      </div>

      <div className="pin-box">
        {villaImages.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            style={{ height: '70vh', minHeight: '500px' }}
          >
            <img
              src={card.img}
              alt={card.name}
              className="size-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
