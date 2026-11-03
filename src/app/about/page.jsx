import Image from "next/image";
import Link from "next/link";
import {
  Waves,
  Sun,
  ShieldCheck,
  PackageCheck,
  Heart,
  MessageCircle,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "About Our Coastal Heritage",
  description:
    "Learn about Dahanu's time-honoured dry seafood tradition, local Koli fishermen, elevated bamboo machans, and natural sun-drying craft.",
};

export default function AboutPage() {
  const whatsappUrl = buildGeneralWhatsAppUrl(
    "Hello Dahanu Dry Fish! I loved reading about your story and would love to try your products."
  );

  return (
    <div className="bg-cream text-navy min-h-screen">
      {/* Hero Banner */}
      <section className="bg-navy-900 text-cream py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 coastal-pattern opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brandOrange/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-ocean/50 border border-ocean-light/30 px-4 py-1.5 rounded-full text-xs font-semibold text-sand-light">
            <MapPin className="w-3.5 h-3.5 text-brandOrange" />
            <span>Dahanu Coastline, Palghar District, Maharashtra</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-cream">
            Generations of Sun, Sea Salt <br />
            <span className="text-brandOrange">&amp; Maritime Tradition</span>
          </h1>

          <p className="text-base sm:text-lg text-sand/85 max-w-2xl mx-auto leading-relaxed pt-2">
            Where the warm tropical breezes of the Arabian Sea meet the authentic artisanal craft of
            Maharashtra&apos;s indigenous Koli fishermen.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-ocean uppercase tracking-widest bg-sand-dark/50 px-3 py-1 rounded-full">
              Our Coastal Roots
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy leading-tight">
              The Legend of Dahanu&apos;s Sea Breeze
            </h2>

            <p className="text-base text-navy/80 leading-relaxed">
              Dahanu is famous across Western India for its serene, palm-fringed coastlines and
              clean ocean air. For generations, local fishing communities here have understood the
              rare harmony needed to produce dry fish with concentrated flavor and none of the harsh
              bitterness found in mass-commercial varieties.
            </p>

            <p className="text-sm text-navy/70 leading-relaxed">
              When fresh Bombil, Prawns, and Surmai are hung under the direct coastal sun, the high
              salinity in the Arabian sea air slowly cures the flesh while sealing in the essential
              oils and sweetness. It is not an industrial factory process — it is an artisanal craft
              passed from mother to daughter, father to son.
            </p>

            <div className="p-5 rounded-2xl bg-sand/60 border border-sand-dark space-y-2">
              <div className="flex items-center gap-2 text-brandOrange font-bold text-sm">
                <Heart className="w-4 h-4 fill-brandOrange" />
                <span>Empowering Coastal Fisherfolk</span>
              </div>
              <p className="text-xs text-navy/75 leading-relaxed">
                By purchasing through Dahanu Dry Fish, you support authentic coastal fishing
                families directly, bypassing predatory middlemen and supporting traditional
                sustainable artisanal methods.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
                alt="Dahanu coastal fishing harbor and boat"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Process Pillars */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-ocean uppercase tracking-widest bg-sand-dark/50 px-3.5 py-1 rounded-full">
              Purity in Every Step
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy">
              How We Dry &amp; Deliver
            </h3>
            <p className="text-sm text-navy/70">
              Our 4-stage quality guarantee guarantees clean, sand-free, and fragrant dry fish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-sand-dark/70 shadow-coastal">
              <div className="w-12 h-12 rounded-2xl bg-sand-light flex items-center justify-center text-brandOrange font-mono font-bold text-lg mb-5">
                01
              </div>
              <h4 className="font-heading text-lg font-bold text-navy mb-2">Dawn Catch</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Boats return at sunrise. Only living, glistening catch is selected for drying to
                retain sweetness.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-sand-dark/70 shadow-coastal">
              <div className="w-12 h-12 rounded-2xl bg-sand-light flex items-center justify-center text-brandOrange font-mono font-bold text-lg mb-5">
                02
              </div>
              <h4 className="font-heading text-lg font-bold text-navy mb-2">Brine &amp; Wash</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Cleaned with filtered brine to remove sand and grit. Seasoned with natural rock salt
                only.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-sand-dark/70 shadow-coastal">
              <div className="w-12 h-12 rounded-2xl bg-sand-light flex items-center justify-center text-brandOrange font-mono font-bold text-lg mb-5">
                03
              </div>
              <h4 className="font-heading text-lg font-bold text-navy mb-2">Elevated Machans</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Fish are hung 8 feet off the beach on bamboo scaffolding, ensuring pristine air
                circulation and zero soil contamination.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-sand-dark/70 shadow-coastal">
              <div className="w-12 h-12 rounded-2xl bg-sand-light flex items-center justify-center text-brandOrange font-mono font-bold text-lg mb-5">
                04
              </div>
              <h4 className="font-heading text-lg font-bold text-navy mb-2">Vacuum Packaging</h4>
              <p className="text-xs text-navy/70 leading-relaxed">
                Multi-layer food grade barrier bags lock out humidity and prevent any odor leakage
                during doorstep courier.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Shop or WhatsApp */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-navy text-cream text-center max-w-3xl mx-auto border border-ocean/50 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-cream">
              Taste the True Coastline Today
            </h3>
            <p className="text-sm sm:text-base text-sand/80 max-w-xl mx-auto">
              Ready to experience authentic Dahanu Bombil, Prawns, or Surmai? Reach out on WhatsApp
              and receive doorstep delivery anywhere in India.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brandOrange hover:bg-brandOrange-hover text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-waGreen hover:bg-waGreen-hover text-navy-900 font-bold text-sm px-6 py-3.5 rounded-xl shadow-wa-glow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-navy-900" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

