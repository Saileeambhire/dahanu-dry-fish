"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, Plus, Minus, Eye, Sparkles, Check } from "lucide-react";
import { buildProductWhatsAppUrl, formatINR } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export default function ProductCard({ product, onQuickView }) {
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(
    // Default to the middle option (e.g. 500g) if available, else first
    product.weightOptions.length > 1 ? 1 : 0
  );
  const [quantity, setQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  const selectedWeight = product.weightOptions[selectedWeightIndex];
  const unitPrice = selectedWeight ? selectedWeight.price : product.basePrice || 200;
  const totalPrice = unitPrice * quantity;

  const handleWeightChange = (index) => {
    setSelectedWeightIndex(index);
  };

  const handleQuantityDec = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleQuantityInc = () => {
    if (quantity < 20) setQuantity((prev) => prev + 1);
  };

  const whatsappUrl = buildProductWhatsAppUrl({
    productName: product.name,
    weight: selectedWeight.label,
    quantity: quantity,
    totalPrice: totalPrice,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group bg-cream-50 rounded-2xl overflow-hidden border border-sand-dark/60 hover:border-brandOrange/40 shadow-coastal hover:shadow-coastal-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-light">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="inline-flex items-center gap-1 bg-brandOrange text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                <Sparkles className="w-3 h-3" />
                {product.badge}
              </span>
            )}
          </div>

          {/* Quick View Button */}
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-navy font-semibold text-xs px-3 py-1.5 rounded-lg shadow-md backdrop-blur-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
              aria-label={`View details for ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5 text-ocean" />
              <span>Details</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Category / Local Name */}
          <p className="text-xs font-semibold text-ocean tracking-wide mb-1">
            {product.localName || product.category}
          </p>

          <h3 className="font-heading text-lg font-bold text-navy group-hover:text-ocean transition-colors leading-tight mb-2">
            {product.name}
          </h3>

          <p className="text-xs text-navy/70 line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Weight Selection Pills */}
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60 block mb-2">
              Select Pack Size:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {product.weightOptions.map((opt, idx) => {
                const isSelected = selectedWeightIndex === idx;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleWeightChange(idx)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      isSelected
                        ? "bg-navy text-cream border-navy shadow-sm"
                        : "bg-white text-navy/80 border-sand-dark/80 hover:border-ocean/50"
                    }`}
                  >
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Price Summary */}
          <div className="flex items-center justify-between py-2 border-t border-sand-dark/40 mb-4">
            <div>
              <span className="text-[11px] text-navy/60 block">Price</span>
              <span className="text-lg font-bold text-brandOrange">
                {formatINR(totalPrice)}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-sand-light rounded-xl p-1 border border-sand-dark/50">
              <button
                type="button"
                onClick={handleQuantityDec}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-navy font-bold hover:bg-sand transition-colors disabled:opacity-40"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-navy">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleQuantityInc}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-navy font-bold hover:bg-sand transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Order Action */}
      <div className="p-5 pt-0">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-sm py-3 px-4 rounded-xl shadow-wa-glow transition-all duration-200 transform active:scale-98 group/btn"
        >
          <MessageCircle className="w-4 h-4 fill-navy-900" />
          <span>Order on WhatsApp</span>
        </a>
        <p className="text-[11px] text-center text-navy/50 mt-2 font-medium">
          Instant confirmation • Pay directly on delivery
        </p>
      </div>
    </motion.div>
  );
}

