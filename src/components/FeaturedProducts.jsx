"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Take the 6 featured products requested: Bombil, Prawns, Surmai, Bangda, Mandeli, Kolambi
  const { products } = useProducts();
  const featuredList = (products.some((p) => p.isFeatured)
    ? products.filter((p) => p.isFeatured)
    : products
  ).slice(0, 6);

  const customOrderUrl = buildGeneralWhatsAppUrl(
    "Hello! I am looking for a custom assortment of dry fish. Can you assist me?"
  );

  return (
    <section id="featured-products" className="py-20 bg-sand-light/50 border-y border-sand-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean uppercase tracking-widest bg-sand-dark/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-brandOrange" />
              <span>Direct From Arabian Sea Nets</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight">
              Featured Coastal Catch
            </h2>
            <p className="text-sm sm:text-base text-navy/70 max-w-xl">
              Authentic Dahanu dry fish, sorted by hand and naturally cured with sea salt. Choose
              your pack size and order directly on WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-700 text-cream text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-brandOrange" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

        {/* Custom Order Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-navy text-cream flex flex-col md:flex-row items-center justify-between gap-6 border border-ocean/50 shadow-coastal">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-cream">
              Looking for wholesale or custom dry seafood packages?
            </h3>
            <p className="text-xs sm:text-sm text-sand/80 max-w-xl">
              We cater to restaurant chefs, regional food stalls, and family gatherings with bulk
              quantities and custom packaging options.
            </p>
          </div>
          <a
            href={customOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-sm px-6 py-3.5 rounded-xl shadow-wa-glow whitespace-nowrap transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-navy-900" />
            <span>Chat for Custom Assortments</span>
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

