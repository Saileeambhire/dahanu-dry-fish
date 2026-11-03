"use client";

import { useState } from "react";
import { testimonials } from "@/data/products";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr > 0 ? curr - 1 : testimonials.length - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr < testimonials.length - 1 ? curr + 1 : 0));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-sand-light/60 border-t border-sand-dark/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-ocean uppercase tracking-widest bg-sand-dark/50 px-3.5 py-1 rounded-full">
            Real Customer Experiences
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
            Loved By Seafood Connoisseurs
          </h2>
          <p className="text-sm sm:text-base text-navy/70">
            Read what home cooks, traditional mothers, and seafood lovers across Maharashtra say
            about our WhatsApp ordering and product quality.
          </p>
        </div>

        {/* Testimonial Carousel Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-coastal-lg border border-sand-dark/70 relative">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-sand/60 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6 relative z-10"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-xl text-navy font-medium leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-sand-dark/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-navy">{current.name}</h3>
                    <p className="text-xs text-navy/60 font-semibold">{current.city}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-sand-light px-3.5 py-1.5 rounded-full text-xs font-bold text-ocean border border-sand-dark/50">
                    <MessageSquare className="w-3.5 h-3.5 text-brandOrange" />
                    <span>Ordered: {current.product}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-sand-dark/30">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentIndex === idx ? "w-8 bg-brandOrange" : "w-2.5 bg-sand-dark"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-sand-dark/80 bg-white hover:bg-sand-light text-navy flex items-center justify-center shadow-sm transition-all active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-sand-dark/80 bg-navy hover:bg-navy-700 text-cream flex items-center justify-center shadow-sm transition-all active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

