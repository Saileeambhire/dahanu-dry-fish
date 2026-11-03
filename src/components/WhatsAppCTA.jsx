"use client";

import { MessageCircle, Zap, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export default function WhatsAppCTA() {
  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hello Dahanu Dry Fish! I am craving authentic dry fish and would like to place an order."
  );

  return (
    <section className="py-20 bg-navy-900 text-cream relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brandOrange/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-waGreen/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 coastal-pattern opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 bg-waGreen/15 border border-waGreen/30 text-waGreen px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm mb-6">
          <Sparkles className="w-4 h-4 fill-waGreen" />
          <span>Effortless WhatsApp Ordering • No Cart • No Login</span>
        </div>

        {/* Section Heading matching specification */}
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-cream tracking-tight leading-tight mb-5">
          Craving Authentic Dry Fish?
        </h2>

        {/* Subtitle matching specification */}
        <p className="text-lg sm:text-2xl text-sand/90 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
          Your favourite coastal flavours are just one WhatsApp message away.
        </p>

        {/* Main CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-extrabold text-lg px-9 py-5 rounded-2xl shadow-wa-glow transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          >
            <MessageCircle className="w-6 h-6 fill-navy-900" />
            <span>ORDER NOW ON WHATSAPP</span>
          </a>
        </div>

        {/* Quick Trust Highlights */}
        <div className="mt-12 pt-10 border-t border-ocean/40 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-3 bg-navy-800/80 p-3.5 rounded-2xl border border-ocean/30">
            <div className="w-9 h-9 rounded-xl bg-brandOrange/20 flex items-center justify-center text-brandOrange shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-cream">Instant Replies</p>
              <p className="text-[11px] text-sand/70">Connect with real people on chat</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-navy-800/80 p-3.5 rounded-2xl border border-ocean/30">
            <div className="w-9 h-9 rounded-xl bg-brandOrange/20 flex items-center justify-center text-brandOrange shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-cream">Doorstep Express</p>
              <p className="text-[11px] text-sand/70">Dispatched across India safely</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-navy-800/80 p-3.5 rounded-2xl border border-ocean/30">
            <div className="w-9 h-9 rounded-xl bg-brandOrange/20 flex items-center justify-center text-brandOrange shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-cream">Vacuum Fresh</p>
              <p className="text-[11px] text-sand/70">100% smell-free sealed pack</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

