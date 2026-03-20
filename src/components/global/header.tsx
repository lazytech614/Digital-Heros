"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useAdmin } from "@/hooks/useAdmin";

type UserData = {
  subscriptionStatus?: string;
};

const Navbar = () => {
  const { isAdmin, isLoaded } = useAdmin();
  const { isSignedIn } = useUser();  
  
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Fetch DB user
  useEffect(() => {
    const fetchUser = async () => {
      if (!isSignedIn) return;
      
      try {
        const res = await fetch("/api/users/user");
        const data = await res.json();
        
        setUserData(data);
        setIsSubscribed(data?.subscriptionStatus === "ACTIVE");
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    
    fetchUser();
  }, [isSignedIn]);
  
  // Navigation links config
  if (!isLoaded) return null; 

  const links = [
    {
      label: "How It Works",
      href: "/#how-it-works",
      loggedin: false,
      subscribed: false,
    },
    {
      label: "Prizes",
      href: "/#prizes",
      loggedin: false,
      subscribed: false,
    },
    {
      label: "Pricing",
      href: "/#pricing",
      loggedin: false,
      subscribed: false,
    },
    {
      label: "Charities",
      href: "/charities",
      loggedin: true,
      subscribed: true,
    },
    {
      label: "Draws",
      href: "/draws",
      loggedin: true,
      subscribed: true,
    },
    {
      label: "Add Score",
      href: "/add-score",
      loggedin: true,
      subscribed: true,
    },
    {
      label: "Profile",
      href: "/profile",
      loggedin: true,
      subscribed: true,
    },
  ];

  const adminLinks = [
    {
      label: "Draws",
      href: "/draws",
    },
    {
      label: "Winners",
      href: "/winners",
    },
    {
      label: "Charities",
      href: "/charities",
    },
    {
      label: "Users",
      href: "/users",
    },
  ]

  // Filter links based on user state
  const filteredLinks = links.filter((link) => {
    if (!isSignedIn && link.loggedin) return false;
    if(isSignedIn && !link.loggedin) return false;
    if(isSignedIn && isSubscribed && !link.subscribed) return false;
    return true;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#053C29] backdrop-blur-lg border-b border-[#10A37F]/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-white tracking-tight">
          Birdie<span style={{ color: "#FFD700" }}>Give</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[#F5F5DC]/70">
          {!isAdmin && filteredLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          {isAdmin && adminLinks.map((link) => (
            <a
              key={link.href}
              href={`/admin/${link.href}`}
              className="text-sm hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          <Show when="signed-out">
            <SignInButton>
              <Button className="bg-transparent text-white hover:bg-white/10">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <button className="bg-[#FFD700] text-black rounded-full font-medium px-4 py-2 hover:opacity-90">
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

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
            {filteredLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[#F5F5DC]/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            <Show when="signed-out">
              <SignInButton>
                <Button className="w-full">Sign In</Button>
              </SignInButton>

              <SignUpButton>
                <Button className="w-full bg-[#FFD700] text-black">
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <div className="flex justify-center">
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;