/**
 * Central site configuration
 * Note: To update the WhatsApp number, update the NEXT_PUBLIC_WHATSAPP_NUMBER
 * environment variable in .env.local or replace the fallback number below.
 * Phone format for wa.me must be country code + phone without '+' or spaces, e.g. 919876543210
 */

export const siteConfig = {
  name: "Dahanu Dry Fish",
  tagline: "Authentic Coastal Flavours, Straight From Dahanu",
  description:
    "Discover the traditional sun-dried seafood flavours of Dahanu's coastline. 100% natural, hygienically dried, and delivered to your doorstep with easy WhatsApp ordering.",
  url: "https://dahanudryfish.com",
  // Configure your WhatsApp number here (e.g. 919876543210)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  contact: {
    phoneDisplay: "+91 98765 43210",
    email: "contact@dahanudryfish.com",
    address: "Sea Face Road, Dahanu Beach, Palghar District, Maharashtra 401602",
    hours: "Monday to Sunday: 8:00 AM – 8:00 PM (IST)",
    instagram: "https://instagram.com/dahanudryfish",
    facebook: "https://facebook.com/dahanudryfish",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

