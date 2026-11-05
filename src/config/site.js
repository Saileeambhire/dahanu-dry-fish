/**
 * Central site configuration
 * Note: To update the WhatsApp number, update the NEXT_PUBLIC_WHATSAPP_NUMBER
 * environment variable in .env.local or replace the fallback number below.
 * Phone format for wa.me must be country code + phone without '+' or spaces, e.g. 917709398119
 */

export const siteConfig = {
  name: "Dahanu Dry Fish",
  tagline: "Authentic Coastal Flavours, Straight From Dahanu",
  description:
    "Discover the traditional sun-dried seafood flavours of Dahanu's coastline. 100% natural, hygienically dried, and delivered to your doorstep with easy WhatsApp ordering.",
  url: "https://dahanudryfish.com",
  // Configure your WhatsApp number here (e.g. 917709398119)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917709398119",
  contact: {
    phoneDisplay: "+91 77093 98119",
    email: "sailee.tandel123@gmail.com",
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

