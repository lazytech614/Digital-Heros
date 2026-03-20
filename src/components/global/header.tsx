"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { User } from "@clerk/nextjs/server";
import { Show, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Navbar = () => {
  const user = useUser()
  
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/users/user");
      const data = await res.json();
      setData(data);
    };

    fetchUser();
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Prizes", href: "#prizes" },
    { label: "Charities", href: "#charities" },
    { label: "Pricing", href: "#pricing" },
    { label: "Draws", href: "/draws" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#053C29] backdrop-blur-lg border-b border-[#10A37F]/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-white tracking-tight">
          Birdie<span style={{ color: "#FFD700" }}>Give</span>
        </a>

        {/* Desktop Links */}
        {data?.subscriptionStatus !== "ACTIVE" ? (
          <div className="hidden md:flex items-center gap-8 text-[#F5F5DC]/70">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:text-[#F5F5DC] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Show when="signed-out">
              <SignInButton>
                <Button className="bg-transparent">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-[#FFD700] text-black rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
        </div>
        ) : (
          <div className="flex items-center gap-8 text-[#F5F5DC]/70">
            <a
              key={"ghjg"}
              href={"/draws"}
              className="text-sm hover:text-[#F5F5DC] transition-colors"
            >
              Draws
            </a>
            <a
              key={"ghjg"}
              href={"/dashboard"}
              className="text-sm hover:text-[#F5F5DC] transition-colors"
            >
              Dashboard
            </a>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#F5F5DC]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0A5C47]/95 backdrop-blur-lg border-b border-[#10A37F]/20">
          <div className="flex flex-col gap-4 p-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full text-black" style={{ backgroundColor: "#FFD700" }}>
              Subscribe Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
