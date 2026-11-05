"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import ProductModal from "./ProductModalWrapper";
import { Search, Filter, Sparkles, MessageCircle, SlidersHorizontal, RotateCcw } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const { products, categories } = useProducts();
  const [modalProduct, setModalProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.localName && p.localName.toLowerCase().includes(q)) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-low") {
      list.sort((a, b) => a.weightOptions[0].price - b.weightOptions[0].price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.weightOptions[0].price - a.weightOptions[0].price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const customAssortmentUrl = buildGeneralWhatsAppUrl(
    `Hello Dahanu Dry Fish! I want to inquire about custom orders or bulk purchases.`
  );

  return (
    <div className="min-h-screen bg-sand-light/30 pb-24">
      {/* Top Banner Header */}
      <div className="bg-navy-900 text-cream py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 coastal-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-brandOrange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-ocean/50 border border-ocean-light/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sand-light mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brandOrange" />
            <span>Pure Sun-Dried Seafood • Direct WhatsApp Delivery</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-cream">
            Authentic Dahanu Dry Fish Collection
          </h1>
          <p className="mt-3 text-sm sm:text-base text-sand/80 max-w-2xl">
            Browse our entire range of sun-dried fish, succulent prawns, and coastal specialties.
            Select your preferred weight and tap to order directly via WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-coastal border border-sand-dark/60 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bombil, prawns, surmai, mandeli..."
                className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-sand-dark/80 bg-sand-light/40 focus:bg-white focus:outline-none focus:border-brandOrange transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-navy/50 hover:text-navy"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-navy/70 whitespace-nowrap">
                <SlidersHorizontal className="w-4 h-4 text-ocean" />
                <span>Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-sand-light/60 border border-sand-dark/80 rounded-xl px-3 py-2 text-xs font-semibold text-navy focus:outline-none focus:border-brandOrange cursor-pointer"
              >
                <option value="featured">Featured / Best Seller</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-3 border-t border-sand-dark/40 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-navy text-cream shadow-sm"
                      : "bg-sand-light/70 text-navy/75 hover:bg-sand hover:text-navy"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm font-semibold text-navy/70">
            Showing <span className="font-bold text-navy">{filteredProducts.length}</span>{" "}
            traditional products
          </p>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brandOrange hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setModalProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-sand-dark/70 shadow-coastal max-w-lg mx-auto">
            <p className="text-base font-bold text-navy mb-2">No matching dry fish found</p>
            <p className="text-xs sm:text-sm text-navy/70 mb-6">
              We might still have fresh catch arriving or unlisted regional seasonal specialties.
              Chat with us directly!
            </p>
            <a
              href={customAssortmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-wa-glow"
            >
              <MessageCircle className="w-4 h-4 fill-navy-900" />
              <span>Ask About Stock on WhatsApp</span>
            </a>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <p className="text-sm font-bold text-navy">Loading Dahanu Seafood Catalog...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

