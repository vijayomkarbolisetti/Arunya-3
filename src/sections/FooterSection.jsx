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
            #AarunyaVillas          </h1>
        </div>

        <div className="flex-center gap-3 sm:gap-4 md:gap-5 relative z-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <div className="social-btn">
            <img src="/images/yt.svg" alt="YouTube" className="w-4 sm:w-5 md:w-6 lg:w-auto" />
          </div>
          <div className="social-btn">
            <img src="/images/insta.svg" alt="Instagram" className="w-4 sm:w-5 md:w-6 lg:w-auto" />
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

        {/* Location Maps Section */}
        <div className="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 px-0 sm:px-4 md:px-10">
          {/* Office Location */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif text-milk">Office Location</h3>
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-milk/20 shadow-lg">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://maps.google.com/maps?q=Greenrich+Group+Kokapet+Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0"
                className="filter grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <p className="text-milk/80 text-base sm:text-lg font-light leading-relaxed">
              <strong className="block text-milk font-medium mb-1">Greenrich Group</strong>
              Plot No. 1, 2nd Floor, Gayatri Enclave,<br />
              Gandipet Road, Kokapet, Hyderabad - 500075
            </p>
          </div>

          {/* Site Location */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif text-milk">Site Location</h3>
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-milk/20 shadow-lg">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://maps.google.com/maps?q=Aarunya+Villas+Tukkuguda+Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0"
                className="filter grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <p className="text-milk/80 text-base sm:text-lg font-light leading-relaxed">
              <strong className="block text-milk font-medium mb-1">Aarunya Villas</strong>
              Tukkuguda, Srisailam Highway,<br />
              Hyderabad (Near ORR Exit-14)
            </p>
          </div>
        </div>

        <div className="copyright-box mt-20 sm:mt-28">
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
