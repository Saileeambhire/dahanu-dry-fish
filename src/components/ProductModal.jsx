"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  Utensils,
  ShieldCheck,
  Star,
} from "lucide-react";
import { buildProductWhatsAppUrl, formatINR } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductModal({ product, onClose }) {
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(
    product ? (product.weightOptions.length > 1 ? 1 : 0) : 0
  );
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const selectedWeight = product.weightOptions[selectedWeightIndex];
  const unitPrice = selectedWeight ? selectedWeight.price : product.basePrice || 200;
  const totalPrice = unitPrice * quantity;

  const whatsappUrl = buildProductWhatsAppUrl({
    productName: product.name,
    weight: selectedWeight.label,
    quantity: quantity,
    totalPrice: totalPrice,
    customNote: customNote,
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-navy-900/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
          className="relative bg-cream rounded-3xl shadow-2xl border border-sand-dark max-w-3xl w-full overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-navy flex items-center justify-center shadow-md transition-transform hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Side */}
            <div className="relative aspect-[4/3] md:aspect-auto h-64 md:h-full bg-sand-light">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent md:hidden" />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-brandOrange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Details Side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
              <div>
                <p className="text-xs font-bold text-ocean uppercase tracking-wider mb-1">
                  {product.localName}
                </p>
                <h2 className="font-heading text-2xl font-bold text-navy leading-tight mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-navy/70">
                    {product.rating} ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                <p className="text-sm text-navy/80 leading-relaxed mb-5">
                  {product.longDescription || product.shortDescription}
                </p>

                {/* Highlights */}
                {product.highlights && (
                  <div className="mb-5 bg-sand/50 rounded-2xl p-4 border border-sand-dark/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-ocean" />
                      Quality Guarantee
                    </h4>
                    <ul className="space-y-1.5">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-navy/80 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-waGreen shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Culinary recommendation */}
                {product.culinaryUse && (
                  <div className="mb-5 flex items-start gap-2.5 text-xs text-navy/75 bg-brandOrange-50 p-3 rounded-xl border border-brandOrange/20">
                    <Utensils className="w-4 h-4 text-brandOrange shrink-0 mt-0.5" />
                    <span>
                      <strong>Culinary Tip:</strong> {product.culinaryUse}
                    </span>
                  </div>
                )}

                {/* Weight Options */}
                <div className="mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
                    Choose Weight Option
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.weightOptions.map((opt, idx) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedWeightIndex(idx)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                          selectedWeightIndex === idx
                            ? "bg-navy text-cream border-navy shadow-md scale-102"
                            : "bg-white text-navy border-sand-dark hover:border-ocean/60"
                        }`}
                      >
                        <div>{opt.label}</div>
                        <div className="text-[11px] opacity-80 mt-0.5 font-normal">
                          {formatINR(opt.price)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Note input */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-navy/70 block mb-1">
                    Special request or packing preference (Optional):
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="e.g. Please send heads cleaned / Split in 2 bags"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-sand-dark bg-white focus:outline-none focus:border-ocean"
                  />
                </div>
              </div>

              {/* Bottom Footer Price and Action */}
              <div className="pt-4 border-t border-sand-dark">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-navy/60 block">Total Order Price</span>
                    <span className="text-2xl font-extrabold text-brandOrange">
                      {formatINR(totalPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-sand-light p-1.5 rounded-xl border border-sand-dark">
                    <button
                      type="button"
                      onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-navy font-bold hover:bg-sand transition-colors disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-navy">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => quantity < 20 && setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-navy font-bold hover:bg-sand transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-base py-3.5 px-6 rounded-2xl shadow-wa-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-5 h-5 fill-navy-900" />
                  <span>Order Now on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

