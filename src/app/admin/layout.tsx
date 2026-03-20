"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { label: "Dashboard", href: "/admin" },
    { label: "Draws", href: "/admin/draws" },
    { label: "Winners", href: "/admin/winners" },
    { label: "Charities", href: "/admin/charities" },
    { label: "Users", href: "/admin/users" },
  ];

  return (
    <div className="flex h-screen overflow-hidden mt-16">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-[#053C29] text-white transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && <h2 className="font-bold text-lg">Admin</h2>}
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2 p-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              {collapsed ? link.label[0] : link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto p-4 text-xs text-white/60">
          {!collapsed && <p>Admin Panel</p>}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-6">
        {children}
      </main>
    </div>
  );
}