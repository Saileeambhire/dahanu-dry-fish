"use client";

import { whyChooseUsData } from "@/data/products";
import { ShieldCheck, Sun, Fish, PackageCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = {
  ShieldCheck: ShieldCheck,
  Sun: Sun,
  Fish: Fish,
  PackageCheck: PackageCheck,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-cream text-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean uppercase tracking-widest bg-sand-dark/50 px-3.5 py-1 rounded-full">
            <Award className="w-4 h-4 text-brandOrange" />
            <span>The Coastal Difference</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
            Why Choose Our Dahanu Dry Fish?
          </h2>
          <p className="text-sm sm:text-base text-navy/70">
            For generations, Dahanu has produced Maharashtra&apos;s finest dry seafood. Here is how
            we preserve that uncompromising quality for you.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whyChooseUsData.map((item, index) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-sand-dark/70 hover:border-brandOrange/40 shadow-coastal hover:shadow-coastal-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-sand-light flex items-center justify-center text-brandOrange mb-6 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-300 shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy mb-3 group-hover:text-ocean transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-sand-dark/30 flex items-center justify-between text-xs font-bold text-ocean">
                  <span>Guaranteed Authenticity</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brandOrange" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

