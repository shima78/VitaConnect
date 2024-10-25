"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Ambulance,
  Stethoscope,
  AlertTriangle,
  Menu,
  Home,
  User,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Paramedic Form", href: "/paramadic", icon: Ambulance },
  {
    name: "Doctor's Diagnostic",
    href: "/hospital",
    icon: Stethoscope,
  },
  {
    name: "Infectious Disease Report",
    href: "/hospital/critical",
    icon: AlertTriangle,
  },
];

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">MediTrack</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <item.icon className="inline-block w-5 h-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-primary"
            >
              <User className="w-5 h-5 mr-2" />
              Profile
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start px-4 py-3 text-gray-600 hover:text-primary"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
