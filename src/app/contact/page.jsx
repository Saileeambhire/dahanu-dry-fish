"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const faqs = [
  {
    q: "How do I place an order without a shopping cart?",
    a: "We intentionally keep ordering simple and personal. Simply select your desired dry fish products, choose your weight, and click 'Order on WhatsApp'. It immediately opens a pre-composed message with your exact order details on WhatsApp. Our coastal support team confirms stock, shares delivery details, and completes your order in seconds.",
  },
  {
    q: "How is the dry fish packed for delivery?",
    a: "Every single order is vacuum-sealed in thick, puncture-resistant food grade barrier pouches. This locks out moisture, preserves crispy freshness, and ensures absolutely ZERO smell escapes during transit or courier delivery.",
  },
  {
    q: "How do I make payment?",
    a: "Once your order is confirmed on WhatsApp, we provide direct UPI options (Google Pay, PhonePe, Paytm, or UPI QR code) as well as bank transfer details. No credit card entering or third-party payment gateways needed.",
  },
  {
    q: "Where do you ship, and how long does it take?",
    a: "We ship all across Mumbai, Thane, Navi Mumbai, Pune, Nashik, and throughout India via express courier services. Mumbai & Pune deliveries typically arrive within 24 to 48 hours. Rest of India takes 3 to 4 business days.",
  },
  {
    q: "Is Dahanu dry fish cleaned and free from beach sand?",
    a: "Yes, 100%! Our fish is dried exclusively on high elevated bamboo machans (scaffolding) 8 feet off the beach ground. They never touch the sand and are thoroughly rinsed in purified sea brine before curing.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    interestedProduct: "Dry Bombil",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formatted = [
      "Hello Dahanu Dry Fish!",
      "",
      `Name: ${formData.name || "Customer"}`,
      `City / Location: ${formData.city || "Not specified"}`,
      `Product Interest: ${formData.interestedProduct}`,
      formData.message ? `Inquiry / Requirement: ${formData.message}` : "",
      "",
      "Please let me know product availability, pricing and delivery time.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = buildGeneralWhatsAppUrl(formatted);
    window.open(url, "_blank");
  };

  const directWhatsAppUrl = buildGeneralWhatsAppUrl(
    "Hello! I would like to inquire about ordering Dahanu dry fish."
  );

  return (
    <div className="bg-sand-light/30 min-h-screen text-navy pb-24">
      {/* Top Banner */}
      <section className="bg-navy-900 text-cream py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 coastal-pattern opacity-40 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-ocean/50 border border-ocean-light/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sand-light">
            <Sparkles className="w-3.5 h-3.5 text-brandOrange" />
            <span>Fast Support & WhatsApp Order Desk</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-cream">
            Contact Our Coastal Desk
          </h1>
          <p className="text-sm sm:text-base text-sand/80 max-w-xl mx-auto">
            Have questions about product availability, bulk hotel orders, or custom preparations?
            We are just a WhatsApp message away.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-dark/70 shadow-coastal space-y-6">
              <h2 className="font-heading text-2xl font-bold text-navy">Get In Touch</h2>
              <p className="text-xs sm:text-sm text-navy/70 leading-relaxed">
                Our team is located right on Dahanu Beach. We take pride in answering your queries
                quickly and transparently.
              </p>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-waGreen/15 border border-waGreen/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-waGreen flex items-center justify-center text-navy-900">
                    <MessageCircle className="w-5 h-5 fill-navy-900" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy">Direct WhatsApp Line</h3>
                    <p className="text-xs text-navy/70">Typical reply within 5-10 minutes</p>
                  </div>
                </div>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all"
                >
                  <span>Chat on WhatsApp: {siteConfig.contact.phoneDisplay}</span>
                </a>
              </div>

              {/* Contact Items */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-navy/80">
                  <MapPin className="w-5 h-5 text-brandOrange shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-navy">Packaging & Drying Facility:</p>
                    <p className="text-navy/70">{siteConfig.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-navy/80">
                  <Phone className="w-5 h-5 text-brandOrange shrink-0" />
                  <div>
                    <p className="font-bold text-navy">Direct Call:</p>
                    <p className="text-navy/70">{siteConfig.contact.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-navy/80">
                  <Mail className="w-5 h-5 text-brandOrange shrink-0" />
                  <div>
                    <p className="font-bold text-navy">Email:</p>
                    <p className="text-navy/70">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-navy/80">
                  <Clock className="w-5 h-5 text-brandOrange shrink-0" />
                  <div>
                    <p className="font-bold text-navy">Operating Hours:</p>
                    <p className="text-navy/70">{siteConfig.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fast WhatsApp Message Generator */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand-dark/70 shadow-coastal">
              <div className="mb-6">
                <span className="text-xs font-bold text-ocean uppercase tracking-wider bg-sand-dark/50 px-3 py-1 rounded-full">
                  Quick Inquiry
                </span>
                <h3 className="font-heading text-2xl font-bold text-navy mt-2">
                  Send Your Inquiry via WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-navy/70 mt-1">
                  Fill in this short form and tap below to start a pre-filled WhatsApp conversation
                  with our coastal dispatch desk.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-navy/80 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-sand-dark bg-sand-light/40 focus:bg-white focus:outline-none focus:border-brandOrange"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-navy/80 block mb-1">
                      City / Area for Delivery
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dadar, Mumbai or Pune"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-sand-dark bg-sand-light/40 focus:bg-white focus:outline-none focus:border-brandOrange"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy/80 block mb-1">
                    Product of Interest
                  </label>
                  <select
                    value={formData.interestedProduct}
                    onChange={(e) =>
                      setFormData({ ...formData, interestedProduct: e.target.value })
                    }
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-sand-dark bg-sand-light/40 focus:bg-white focus:outline-none focus:border-brandOrange cursor-pointer"
                  >
                    <option value="Dry Bombil (Bombay Duck)">Dry Bombil (Bombay Duck)</option>
                    <option value="Dry Prawns / Sukha Jhinga">Dry Prawns / Sukha Jhinga</option>
                    <option value="Dry Surmai Kingfish Steaks">Dry Surmai Kingfish Steaks</option>
                    <option value="Dry Bangda Mackerel">Dry Bangda Mackerel</option>
                    <option value="Dry Mandeli Golden Anchovy">Dry Mandeli Golden Anchovy</option>
                    <option value="Dry Tiny Kolambi (Karandi)">Dry Tiny Kolambi (Karandi)</option>
                    <option value="Custom Bulk / Assortment Package">Custom Bulk / Assortment Package</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy/80 block mb-1">
                    Your Requirements / Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="e.g. I need 2kg of Dry Bombil and 500g Prawns sent to Pune. Please confirm availability."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-sand-dark bg-sand-light/40 focus:bg-white focus:outline-none focus:border-brandOrange"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-wa-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-5 h-5 fill-navy-900" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-ocean uppercase tracking-wider bg-sand-dark/50 px-3 py-1 rounded-full">
              Ordering Guide
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-navy">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-navy/70">
              Clear, transparent answers on how our WhatsApp seafood delivery works.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-sand-dark/70 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left font-heading font-bold text-sm sm:text-base text-navy flex items-center justify-between gap-4 hover:text-brandOrange transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-ocean transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-brandOrange" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-navy/75 border-t border-sand-light leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

