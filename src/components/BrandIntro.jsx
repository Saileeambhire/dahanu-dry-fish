"use client";

import Image from "next/image";
import Link from "next/link";
import { Waves, CheckCircle2, ArrowRight, Sun, Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandIntro() {
  return (
    <section className="py-20 bg-cream text-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative">
              {/* Main large image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80"
                  alt="Dahanu coastline fishermen boat"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Overlapping secondary image */}
              <div className="absolute -bottom-8 -right-6 sm:-bottom-10 sm:-right-8 w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <Image
                  src="https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80"
                  alt="Freshly dried prawns on clean coastal racks"
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Award Pill */}
              <div className="absolute -top-4 -left-4 bg-navy text-cream p-4 rounded-2xl shadow-coastal-lg border border-ocean/40 max-w-[200px]">
                <div className="flex items-center gap-2 text-brandOrange mb-1">
                  <Sun className="w-5 h-5" />
                  <span className="font-heading font-bold text-sm">Solar Cured</span>
                </div>
                <p className="text-[11px] text-sand/80 leading-snug">
                  100% naturally dried under clean sea winds
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-ocean text-xs font-bold tracking-widest uppercase bg-sand-dark/40 px-3 py-1 rounded-full">
              <Waves className="w-4 h-4 text-brandOrange" />
              <span>Coastal Tradition & Heritage</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              From Our Coast <br />
              <span className="text-brandOrange">To Your Kitchen</span>
            </h2>

            <p className="text-base text-navy/80 leading-relaxed">
              Nestled along the pristine northern coastline of Maharashtra, Dahanu has been the
              heartbeat of traditional dry fish making for generations. The confluence of nutrient-rich
              Arabian tides and steady, warm coastal sea breezes creates the ideal microclimate for
              natural seafood preservation.
            </p>

            <p className="text-sm text-navy/70 leading-relaxed">
              Unlike industrial dry fish often found in congested wholesale city mandis, our fish is
              brought directly from morning fishing boats to high elevated bamboo machans. No flies, no
              grit, no chemical preservatives — just pure coastal sea salt, natural sunshine, and
              uncompromising care.
            </p>

            {/* Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brandOrange shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-navy/85">
                  Direct harvest from local Koli boats
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brandOrange shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-navy/85">
                  Raised bamboo drying platforms
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brandOrange shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-navy/85">
                  Zero chemical bleach or additives
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brandOrange shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-navy/85">
                  Odor-tight vacuum courier packaging
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-navy font-bold text-sm hover:text-brandOrange transition-colors group"
              >
                <span>Read the Dahanu Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

