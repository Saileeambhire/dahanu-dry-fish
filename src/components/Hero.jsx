"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, ShieldCheck, Sun, Sparkles, MapPin } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export default function Hero() {
  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hello Dahanu Dry Fish! I am visiting your website and would like to place an order."
  );

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-900 text-cream pt-8 pb-16">
      {/* Background Coastal Wave Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy to-navy-900 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brandOrange/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-ocean/30 blur-3xl pointer-events-none" />

      {/* Decorative Subtle Grid */}
      <div className="absolute inset-0 coastal-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Origin Badge */}
            <div className="inline-flex items-center gap-2 bg-ocean/40 border border-ocean-light/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sand-light shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brandOrange" />
              <span>Direct From Dahanu Beach, Maharashtra</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brandOrange" />
              <span className="text-sand/80">Koli Fisherman Heritage</span>
            </div>

            {/* Cinematic Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-cream leading-[1.08]">
              Authentic Taste. <br />
              <span className="text-gradient-orange">Straight From Dahanu.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-sand/85 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover the traditional flavours of Dahanu&apos;s coastline. Carefully selected
              dry fish, naturally sun-dried on sea-breeze scaffolds, packed with care and delivered
              to your doorstep.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brandOrange hover:bg-brandOrange-hover text-white font-bold text-base px-7 py-4 rounded-2xl shadow-orange-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-base px-7 py-4 rounded-2xl shadow-wa-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-navy-900" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-ocean/30 max-w-xl mx-auto lg:mx-0 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-brandOrange font-bold text-sm">
                  <Sun className="w-4 h-4" />
                  <span>100% Sun-Dried</span>
                </div>
                <p className="text-xs text-sand/70 mt-0.5">Naturally cured by sea air</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-brandOrange font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Zero Chemicals</span>
                </div>
                <p className="text-xs text-sand/70 mt-0.5">Pure rock salt preservative</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-brandOrange font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Vacuum Packed</span>
                </div>
                <p className="text-xs text-sand/70 mt-0.5">No smell during transit</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-brandOrange/30 to-ocean/40 rounded-3xl blur-xl" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-ocean/50 shadow-2xl bg-navy-800">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80"
                    alt="Authentic Dahanu Dry Bombil and Seafood"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/30 to-transparent" />

                  {/* Floating Card: Best Seller Bombil */}
                  <div className="absolute top-6 right-6 bg-navy/90 backdrop-blur-md border border-ocean/50 rounded-2xl p-3 shadow-lg flex items-center gap-3 animate-float-slow">
                    <div className="w-10 h-10 rounded-xl bg-brandOrange/20 flex items-center justify-center text-brandOrange">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-sand/70 uppercase tracking-wider font-semibold">
                        Signature Catch
                      </p>
                      <p className="text-xs font-bold text-cream">Dahanu Sun-Dried Bombil</p>
                    </div>
                  </div>

                  {/* Bottom Overlay Card: WhatsApp Quick Order */}
                  <div className="absolute bottom-6 left-6 right-6 bg-navy-900/90 backdrop-blur-md border border-ocean/60 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-brandOrange">
                          No complex checkout!
                        </p>
                        <p className="text-sm font-bold text-cream">
                          Select Product & Chat on WhatsApp
                        </p>
                      </div>
                      <span className="w-9 h-9 rounded-full bg-waGreen/20 flex items-center justify-center text-waGreen">
                        <MessageCircle className="w-5 h-5 fill-waGreen" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

