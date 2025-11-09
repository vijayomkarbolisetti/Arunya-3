import { useMediaQuery } from "react-responsive";
import theme from "../constants/theme";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section className="footer-section">
      <img
        src="/images/11.jpg"
        alt=""
        className="w-full object-cover -translate-y-1"
      />

      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
        <video
          src="/videos/hero-bg.webm"
          autoPlay
          playsInline
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="overflow-hidden z-10 relative">
          <h1 className="general-title text-center text-milk py-5">
            #AarunyaVillas
          </h1>
        </div>

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="social-btn">
            <img src="./images/yt.svg" alt="" />
          </div>
          <div className="social-btn">
            <img src="./images/insta.svg" alt="" />
          </div>
          <div className="social-btn">
            <img src="./images/tiktok.svg" alt="" />
          </div>
        </div>

        <div className="mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium relative z-10">
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>Aarunya Villas</p>
            </div>
            <div>
              <p>Villa Types</p>
              <p>Amenities</p>
              <p>Location</p>
            </div>
            <div>
              <p>Greenrich Group</p>
              <p>Contact: +91 938 611 9999</p>
              <p>Tukkuguda, Hyderabad</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>
              Get Exclusive Information About Villa Availability,
              Site Visits, and Special Offers!
            </p>
            <div
              className="flex justify-between items-center border-b py-5 md:mt-10"
              style={{ borderColor: theme.presets.footerSection.border }}
            >
              {/* The input field and arrow icon for inquiry signup. */}{" "}
              {/* A border at the bottom for a clean, modern look. */}
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full placeholder:font-sans"
                style={{ color: theme.presets.footerSection.placeholder }}
              />
              <img src="/images/arrow.svg" alt="arrow" />
            </div>
          </div>
        </div>

        <div className="copyright-box relative z-10">
          {/* The final row with copyright and legal links. */}
          <p>Copyright © 2025 Greenrich Highlands - Aarunya Villas - All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
