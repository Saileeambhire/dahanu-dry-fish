"use client";

import { useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hello! I want to order dry fish products. Could you please guide me?"
  );

  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
    >
      {/* Tooltip / Badge */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 bg-navy text-cream text-xs font-semibold px-3.5 py-2 rounded-xl shadow-coastal-lg border border-ocean/40 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-waGreen animate-ping"></span>
            <span>Order on WhatsApp directly</span>
            <Sparkles className="w-3.5 h-3.5 text-brandOrange" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Floating Button */}
      <div className="relative group">
        {/* Radar Ring */}
        <span className="absolute -inset-1 rounded-full bg-waGreen opacity-60 animate-ping group-hover:opacity-80"></span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-waGreen hover:bg-waGreen-hover text-navy-900 shadow-wa-glow transition-all duration-300 transform group-hover:scale-105 active:scale-95"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 fill-navy-900 stroke-navy-900" />
        </a>

        {/* Small floating notification bubble */}
        <span className="absolute -top-1 -right-1 bg-brandOrange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-cream shadow-sm">
          Online
        </span>
      </div>
    </aside>
  );
}

