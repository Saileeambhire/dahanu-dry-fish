"use client";

import { useState } from "react";
import Image from "next/image";
import { storyMilestones } from "@/data/products";
import { Waves, Compass, Sun, PackageCheck, Anchor, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StorySection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = storyMilestones[activeStep];

  return (
    <section className="py-24 bg-navy-900 text-cream relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-ocean/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 coastal-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sand-light uppercase tracking-widest bg-ocean/40 border border-ocean-light/30 px-3.5 py-1.5 rounded-full">
            <Anchor className="w-3.5 h-3.5 text-brandOrange" />
            <span>Heritage Since Generations</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-cream tracking-tight">
            The Dahanu Coastal Story
          </h2>
          <p className="text-sm sm:text-base text-sand/80">
            A centuries-old dance between the Arabian Sea tides, the blazing tropical sun, and the
            unmatched wisdom of the coastal Koli fisherfolk.
          </p>
        </div>

        {/* Milestone Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
          {storyMilestones.map((m, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={m.step}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`py-3 px-4 rounded-2xl text-left border transition-all duration-300 relative ${
                  isActive
                    ? "bg-ocean border-brandOrange text-cream shadow-coastal-lg"
                    : "bg-navy-800/80 border-ocean/40 text-sand/70 hover:bg-navy-800 hover:text-cream"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-extrabold ${
                      isActive ? "text-brandOrange" : "text-sand/50"
                    }`}
                  >
                    Phase {m.step}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-brandOrange animate-pulse" />
                  )}
                </div>
                <p className="text-xs sm:text-sm font-bold truncate">{m.title}</p>
              </button>
            );
          })}
        </div>

        {/* Cinematic Display Card */}
        <div className="bg-navy-800/90 rounded-3xl border border-ocean/40 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Visual Image Side with AnimatePresence */}
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto h-72 lg:h-full bg-navy-950 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.step}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent lg:hidden" />
                </motion.div>
              </AnimatePresence>

              {/* Step counter badge */}
              <div className="absolute top-4 left-4 z-10 bg-navy-900/80 backdrop-blur-md border border-ocean/60 px-3.5 py-1.5 rounded-full text-xs font-bold text-cream flex items-center gap-2">
                <span className="text-brandOrange font-mono">{current.step}</span>
                <span>/ 04</span>
              </div>
            </div>

            {/* Narrative Content Side */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.step}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className="text-xs font-bold text-brandOrange tracking-widest uppercase block">
                    {current.subtitle}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-cream leading-snug">
                    {current.title}
                  </h3>
                  <p className="text-sm sm:text-base text-sand/80 leading-relaxed">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-8 border-t border-ocean/30 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((prev) => (prev > 0 ? prev - 1 : storyMilestones.length - 1))
                  }
                  className="text-xs font-bold text-sand hover:text-white transition-colors"
                >
                  ← Previous Step
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveStep((prev) => (prev < storyMilestones.length - 1 ? prev + 1 : 0))
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brandOrange hover:text-brandOrange-hover transition-colors"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

