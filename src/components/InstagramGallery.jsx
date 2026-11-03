"use client";

import Image from "next/image";
import { instagramGallery } from "@/data/products";
import { Heart, Sparkles, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

function Instagram({ className = "w-4 h-4", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-cream text-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean uppercase tracking-widest bg-sand-dark/50 px-3.5 py-1 rounded-full">
              <Instagram className="w-3.5 h-3.5 text-brandOrange" />
              <span>@dahanudryfish</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
              Coastal Life on Instagram
            </h2>
            <p className="text-sm sm:text-base text-navy/70 max-w-xl">
              Follow our daily journey on Dahanu&apos;s beaches — from morning boat landings to high
              machan sun-drying and dispatching orders.
            </p>
          </div>

          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all self-start md:self-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-sand-light shadow-sm hover:shadow-coastal transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Card */}
              <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-between text-cream">
                <div className="flex items-center justify-between text-[11px] text-brandOrange font-bold">
                  <span>{item.tag}</span>
                  <div className="flex items-center gap-1 text-cream/90">
                    <Heart className="w-3 h-3 fill-rose-500 stroke-rose-500" />
                    <span>{item.likes}</span>
                  </div>
                </div>

                <p className="text-[11px] text-sand-light line-clamp-3 leading-snug">
                  {item.caption}
                </p>

                <div className="flex items-center gap-1 text-[10px] text-sand/70">
                  <Instagram className="w-3 h-3 text-brandOrange" />
                  <span>Dahanu Coast</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

