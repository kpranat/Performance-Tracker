"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, CalendarPlus, ClipboardList, Clock, LogIn } from "lucide-react";

export function NavBar() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/events", label: "Events", icon: CalendarPlus },
    { href: "/assignments", label: "Assignments", icon: ClipboardList },
    { href: "/availability", label: "Availability", icon: Clock },
    { href: "/login", label: "Login", icon: LogIn },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 pb-4 border-b border-gray-200">
      {navItems.map((item) => (
        <Button key={item.href} variant="ghost" asChild className="hover:bg-white/50">
          <Link href={item.href} className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}