import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Sun,
  Package,
} from "lucide-react";

export default function Footer() {
  const generalWhatsApp = buildGeneralWhatsAppUrl(
    "Hello! I am visiting your website and would like more details about ordering dry fish."
  );

  return (
    <footer className="bg-navy-900 text-sand border-t border-ocean/40 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-ocean/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ocean/40 flex items-center justify-center text-brandOrange">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-cream text-sm font-semibold">100% Sun-Dried</p>
              <p className="text-sand/70 text-xs">Traditional bamboo machans</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ocean/40 flex items-center justify-center text-brandOrange">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-cream text-sm font-semibold">Zero Chemicals</p>
              <p className="text-sand/70 text-xs">Natural sea salt cure only</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ocean/40 flex items-center justify-center text-brandOrange">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-cream text-sm font-semibold">Vacuum Sealed</p>
              <p className="text-sand/70 text-xs">Odor-proof, fresh packaging</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ocean/40 flex items-center justify-center text-waGreen">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-cream text-sm font-semibold">Instant WhatsApp</p>
              <p className="text-sand/70 text-xs">No logins or cart hurdles</p>
            </div>
          </div>
        </div>

        {/* Middle Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white p-0.5 border-2 border-brandOrange/40 shadow-md shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="मासे मित्र - Mase Mitra Seafood Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              {/* <div>
                <span className="font-heading text-xl font-bold tracking-tight text-cream block">
                  मासे मित्र <span className="text-brandOrange">Seafood</span>
                </span>
                <span className="text-[11px] text-sand/80 block uppercase tracking-wider">
                  समुद्राची चव, तुमच्या घरी!
                </span>
              </div> */}
            </Link>
            <p className="text-sand/80 text-sm leading-relaxed max-w-sm">
              Bringing the pure, unadulterated maritime traditions of Dahanu to your kitchen.
              Every fish is caught fresh by our local Koli fishermen, salted with care, and
              solar-dried under the pristine coastal sea breeze.
            </p>
            <div className="pt-2">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-waGreen/15 hover:bg-waGreen/25 text-waGreen border border-waGreen/30 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-waGreen" />
                <span>Chat directly: {siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-heading text-cream font-bold text-base tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brandOrange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brandOrange transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brandOrange transition-colors">
                  Our Story & Dahanu Heritage
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brandOrange transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brandOrange transition-colors">
                  Contact & Ordering FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-heading text-cream font-bold text-base tracking-wide uppercase">
              Coastal Headquarters
            </h4>
            <div className="space-y-3 text-sm text-sand/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brandOrange shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brandOrange shrink-0" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brandOrange shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brandOrange shrink-0" />
                <span>{siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and WhatsApp Notice */}
        <div className="pt-8 mt-6 border-t border-ocean/30 flex flex-col md:flex-row items-center justify-between text-xs text-sand/60 gap-4">
          <p>© {new Date().getFullYear()} मासे मित्र Seafood (Dahanu Dry Fish). All rights reserved.</p>
          <p className="text-center md:text-right">
            Zero checkout gateways • Orders processed individually on WhatsApp for maximum freshness
          </p>
        </div>
      </div>
    </footer>
  );
}
