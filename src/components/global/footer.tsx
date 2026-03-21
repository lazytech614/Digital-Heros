import Link from "next/link";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "How it Works", href: "/#how-it-works" },
      { name: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policies" },
      { name: "Terms of Service", href: "/terms-of-services" },
      { name: "Cookie Policy", href: "/cookie-policies" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Centre", href: "/help" },
      { name: "FAQs", href: "/faq" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#1D1816] text-white py-8 px-6 md:px-12">
      <div className="container px-4 mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0 text-sm">
        
        {/* Logo + Description */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Birdie<span className="text-[#FFD700]">Give</span>
          </Link>

          <p className="text-sm opacity-75 text-center md:text-left max-w-75 mt-1">
            A subscription platform where golf scores power charitable giving and monthly prize draws.
          </p>
        </div>

        {/* Dynamic Links */}
        <div className="flex justify-between gap-12 text-left w-2/3">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col items-start group w-1/3">
              
              <p className="uppercase hover:text-orange-400 transition-colors duration-200 relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-orange-400 after:group-hover:w-full after:transition-all after:duration-300">
                {section.title}
              </p>

              {section.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xm opacity-75 mt-1 hover:opacity-100 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[0.5px] bg-gray-600 my-8" />

      <div className="container px-4 mx-auto flex justify-between items-center text-sm opacity-75">
        <p>&copy; {new Date().getFullYear()} BirdieGive</p>
        <p>Made with 💖 for golfers & charities.</p>
      </div>
    </footer>
  );
};

export default Footer;