import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="bg-[#1D1816] text-white py-8 px-6 md:px-12">
      <div className="container px-4 mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0 text-sm">
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="text-xl font-bold text-white tracking-tight">
            Birdie<span style={{ color: "#FFD700" }}>Give</span>
          </a>
          <div className="text-sm opacity-75 text-center md:text-left max-w-[300px] mt-1">
            A subscription platform where golf scores power charitable giving and monthly prize draws.
          </div>
        </div>

        <div className="flex justify-between gap-12 text-left w-2/3">
          <div className="flex flex-col items-start group w-1/3">
            <a href="#" className="uppercase hover:text-orange-400 transition-colors duration-200 relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-orange-400 after:group-hover:w-full after:transition-all after:duration-300">
              Platform
            </a>
            <div className="text-xm opacity-75 mt-1">How it Works</div>
            <div className="text-xm opacity-75">Pricing</div>
          </div>

          <div className="flex flex-col items-start group w-1/3">
            <a href="#" className="uppercase hover:text-orange-400 transition-colors duration-200 relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-orange-400 after:group-hover:w-full after:transition-all after:duration-300">
              Legal
            </a>
            <div className="text-xm opacity-75 mt-1">Privacy Policy</div>
            <div className="text-xm opacity-75">Terms of Service</div>
            <div className="text-xm opacity-75 mt-1">Cookie Policy</div>
          </div>

          <div className="flex flex-col items-start group w-1/3">
            <a href="#" className="uppercase hover:text-orange-400 transition-colors duration-200 relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-orange-400 after:group-hover:w-full after:transition-all after:duration-300">
              Support
            </a>
            <div className="text-xm opacity-75 mt-1">Help Centre</div>
            <div className="text-xm opacity-75">FAQs</div>
            <div className="text-xm opacity-75">Contact Us</div>
          </div>
        </div>
      </div>
      
      <div className="w-full h-[0.5px] bg-gray-600 my-8" />

      <div className="container px-4 mx-auto flex justify-between items-center text-sm opacity-75">
        <p>className="container px-4 mx-auto</p>
        <p>Made with 💖 for golfers & charities.</p>
      </div>
    </footer>
  );
};

export default Footer;
