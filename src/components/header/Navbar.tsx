"use client";
import { DataNav } from "@/data/dataNav";
import type { WebSettings } from "@/features/settings/types";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SearchDialog } from "./SearchPopover";
import { AuthDropdown } from "@/features/auth/component/AuthDropdown";



export function Navbar({
  data,
  pathname,
}: {
  data: WebSettings;
  pathname: string;
}) {  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative transition-all duration-500 ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50"
                : "bg-white/70 backdrop-blur-md shadow-md"
            } rounded-full border border-slate-200/50`}
          >
            <div className="flex items-center justify-between py-4 px-4">
              {/* Logo with Gradient */}
                <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Home"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={data.logo_url}
                  alt="Logo"
                  width={140}
                  height={45}
                  className="relative h-11 w-auto rounded-3xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

              {/* Desktop Navigation - Centered Pills */}
              <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                {DataNav.map((item) => {
                  const isActive = pathname === item.link;
                  return (
                    <Link
                      key={item.link}
                      href={item.link}
                      className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-slate-600 hover:bg-primary hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
               
               <SearchDialog />

                {/* Mobile Menu */}
                <Button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden rounded-full transition-colors flex items-center justify-center"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
                                               <AuthDropdown  />

              </div>
            </div>
          </div>

          {/* Mobile Menu - Card Style */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-slate-200/50 overflow-hidden">
              <nav className="p-4 flex flex-col space-y-2">
                {DataNav.map((item) => {
                  const isActive = pathname === item.link;
                  return (
                    <Link
                    href={item.link}
                      key={item.link}
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-2xl font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-slate-600 bg-slate-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                
              </nav>
            </div>
          )}
        </div>
      </header>

     
  );
}
