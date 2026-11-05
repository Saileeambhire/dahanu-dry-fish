"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { Menu, X, MessageCircle, Waves, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generalWhatsAppUrl = buildGeneralWhatsAppUrl(
    "Hello Dahanu Dry Fish! I would like to explore your dry fish products and order."
  );

  return (
    <>
      {/* Top Announcement Bar */}
      {/* <div className="bg-navy-900 text-sand-light text-xs font-medium py-2 px-4 border-b border-ocean/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-waGreen animate-pulse"></span>
            <span>Sun-Dried Authentic Catch • Direct WhatsApp Delivery Across India</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-sand">
              <Phone className="w-3 h-3 text-brandOrange" />
              Direct Support: {siteConfig.contact.phoneDisplay}
            </span>
          </div>
        </div>
      </div> */}

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? "bg-navy/95 backdrop-blur-md shadow-coastal py-3 border-b border-ocean/30"
          : "bg-navy py-4 border-b border-ocean/20"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="">
            <div className="relative w-20 h-20 sm:w-13 sm:h-13 rounded-full overflow-hidden bg-white p-0.5 shadow-md shadow-brandOrange/20 border-2 border-brandOrange/40 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <Image
                src="/images/logo.png"
                alt="मासे मित्र - Mase Mitra Seafood Logo"
                fill
                sizes="52px"
                className="object-contain"
                priority
              />
            </div>



            {/* <div>
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-cream block leading-tight">
                मासे मित्र <span className="text-brandOrange">Seafood</span>
              </span>
              <span className="text-[10px] sm:text-xs text-sand tracking-widest uppercase font-medium block">
                समुद्राची चव, तुमच्या घरी!
              </span>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${isActive
                    ? "text-brandOrange font-bold"
                    : "text-sand-light hover:text-brandOrange"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brandOrange rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* WhatsApp Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-sm px-4 py-2.5 rounded-full shadow-wa-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-navy-900" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-sand hover:text-white hover:bg-ocean/30 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-ocean/30 bg-navy-900/98 backdrop-blur-xl px-4 pt-4 pb-6 shadow-2xl"
            >
              <div className="flex flex-col space-y-3">
                {siteConfig.navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold ${isActive
                        ? "bg-ocean text-cream"
                        : "text-sand-light hover:bg-ocean/30 hover:text-cream"
                        }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-sand" />
                    </Link>
                  );
                })}

                <div className="pt-3 border-t border-ocean/40">
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold py-3 rounded-xl shadow-wa-glow text-center text-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-navy-900" />
                    <span>Order on WhatsApp Directly</span>
                  </a>
                  <p className="text-center text-sand/70 text-xs mt-2">
                    Quick ordering • Instant quote on chat
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

