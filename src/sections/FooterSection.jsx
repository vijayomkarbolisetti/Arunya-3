import theme from "../constants/theme";

const FooterSection = () => {
  return (
    <section id="footer" className="footer-section">
      {/* <img
        src="/images/footer-dip.png"
        alt=""
        className="w-full object-cover -translate-y-1"
      /> */}

      <div className="min-h-dvh 2xl:h-[110dvh] relative pt-16 sm:pt-20 md:pt-[15vh] lg:pt-[20vh] px-4 sm:px-6 md:px-8">
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-milk py-3 sm:py-4 md:py-5">
            #LiveGreenRich
          </h1>
        </div>

        <div className="flex-center gap-3 sm:gap-4 md:gap-5 relative z-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <div className="social-btn">
            <img src="./images/yt.svg" alt="YouTube" className="w-4 sm:w-5 md:w-6 lg:w-auto" />
          </div>
          <div className="social-btn">
            <img src="./images/insta.svg" alt="Instagram" className="w-4 sm:w-5 md:w-6 lg:w-auto" />
          </div>
          <div className="social-btn">
            <img src="./images/tiktok.svg" alt="TikTok" className="w-4 sm:w-5 md:w-6 lg:w-auto" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-32 lg:mt-40 px-0 sm:px-4 md:px-10 flex gap-8 sm:gap-10 flex-col md:flex-row justify-between text-milk font-paragraph text-sm sm:text-base md:text-lg font-medium">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 md:gap-16">
            <div>
              <p>Aarunya Villas</p>
            </div>
            {/* <div>
              <p>Villa Types</p>
              <p>Amenities</p>
              <p>Location</p>
            </div> */}
            <div className="space-y-1">
              <p>Greenrich Group</p>
              <p>Contact: +91 938 611 9999</p>
              <p>Tukkuguda, Hyderabad</p>
            </div>
          </div>

          <div className="w-full md:max-w-md lg:max-w-lg">
            <p className="mb-4 sm:mb-6">
              Get Exclusive Information About Villa Availability, Site Visits,
              and Special Offers!
            </p>
            <div
              className="flex justify-between items-center border-b border-milk/30 py-4 sm:py-5 mt-6 sm:mt-8 md:mt-10 hover:border-milk transition-colors duration-300"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-milk placeholder:text-milk/50 outline-none font-sans text-lg"
              />
              <button className="group">
                <img src="/images/arrow.svg" alt="arrow" className="w-6 sm:w-8 md:w-10 flex-shrink-0 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="copyright-box">
          {/* The final row with copyright and legal links. */}
          <p>
            Copyright © 2025 Greenrich Highlands - Aarunya Villas - All Rights
            Reserved
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-7">
            <a href="#" className="hover:underline hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-white transition-colors cursor-pointer">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
