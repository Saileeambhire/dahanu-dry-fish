"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const categoryCards = [
  {
    id: "bombil",
    title: "Dry Bombil (Bombay Duck)",
    subtitle: "Coastal Signature",
    description: "Crispy, sun-cured Bombay duck dried on coastal sea breezes.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    link: "/shop?category=bombil",
    tag: "Best Seller",
  },
  {
    id: "prawns",
    title: "Sun-Dried Prawns & Kolambi",
    subtitle: "Sweet & Tender",
    description: "Shell-free Sukat and baby Karandi for iconic coastal thecha & gravies.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    link: "/shop?category=prawns",
    tag: "Most Popular",
  },
  {
    id: "premium",
    title: "Surmai & Premium Cuts",
    subtitle: "Prime Kingfish & Steaks",
    description: "Dense, meaty fillets salted lightly and vacuum-sealed for richness.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    link: "/shop?category=premium",
    tag: "Gourmet",
  },
  {
    id: "daily",
    title: "Crispy Bangda & Mandeli",
    subtitle: "Daily Ocean Catch",
    description: "Whole butterflied mackerels & crunchy calcium-rich anchovies.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    link: "/shop?category=daily",
    tag: "Traditional",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-cream text-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-ocean uppercase tracking-widest bg-sand-dark/50 px-3.5 py-1 rounded-full">
              Explore By Category
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
              Curated Seafood Collections
            </h2>
            <p className="text-sm sm:text-base text-navy/70 max-w-xl">
              Browse our diverse coastal collections, harvested sustainably and prepared with
              generations of Konkani expertise.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-sm font-bold text-ocean hover:text-brandOrange flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>See entire catalogue</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link
                href={cat.link}
                className="group relative block rounded-3xl overflow-hidden aspect-[4/5] bg-navy shadow-coastal hover:shadow-coastal-lg transition-all duration-300"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-90"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-navy text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                    <Sparkles className="w-3 h-3 text-brandOrange" />
                    {cat.tag}
                  </span>
                </div>

                {/* Content at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
                  <span className="text-[11px] font-bold text-brandOrange tracking-wider uppercase mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-cream group-hover:text-brandOrange transition-colors leading-snug mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-sand/80 line-clamp-2 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-cream group-hover:text-brandOrange transition-colors">
                    <span>Explore Products</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

