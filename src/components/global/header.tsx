"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Prizes", href: "#prizes" },
    { label: "Charities", href: "#charities" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary backdrop-blur-lg border-b border-emerald-mid/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-white tracking-tight">
          Birdie<span style={{ color: "var(--cta)" }}>Give</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream/70 hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" style={{ backgroundColor: "var(--cta)" }} className="text-black">
            Subscribe Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-cream"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-emerald-deep/95 backdrop-blur-lg border-b border-emerald-mid/20">
          <div className="flex flex-col gap-4 p-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-cream/70 hover:text-cream transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full">Subscribe Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;