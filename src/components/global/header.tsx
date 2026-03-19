"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          🎯 LuckyDraw
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
                <UserButton />
            ) : (
                <>
                <SignInButton>
                    <button className="px-4 py-2 text-sm border rounded-lg">
                    Sign In
                    </button>
                </SignInButton>

                <SignUpButton>
                    <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">
                    Get Started
                    </button>
                </SignUpButton>
                </>
            )}
            </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-4 bg-background">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/#how" onClick={() => setOpen(false)}>How it works</Link>
          <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link href="/admin" onClick={() => setOpen(false)}>Admin</Link>

          <div className="pt-4 border-t">
            {isSignedIn ? (
                <UserButton />
            ) : (
                <>
                <SignInButton>
                    <button className="block mb-2" onClick={() => setOpen(false)}>
                    Sign In
                    </button>
                </SignInButton>

                <SignUpButton>
                    <button className="block font-semibold" onClick={() => setOpen(false)}>
                    Get Started
                    </button>
                </SignUpButton>
                </>
            )}
            </div>
        </div>
      )}
    </header>
  );
}