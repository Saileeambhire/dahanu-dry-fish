import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import { siteConfig } from "@/config/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dahanu Dry Fish – Authentic Coastal Seafood on WhatsApp",
    template: "%s | Dahanu Dry Fish",
  },
  description:
    "Premium authentic sun-dried seafood from Dahanu coastline. Dry Bombil, Sukat Prawns, Surmai, Bangda & Mandeli. Direct ordering on WhatsApp with doorstep delivery.",
  keywords: [
    "Dahanu dry fish",
    "dry bombil",
    "sukha jhinga",
    "dry prawns",
    "dry surmai",
    "dry bangda",
    "mandeli",
    "authentic koli food",
    "whatsapp dry fish order",
    "mumbai dry fish online",
  ],
  authors: [{ name: "Dahanu Dry Fish" }],
  openGraph: {
    title: "Dahanu Dry Fish – Authentic Coastal Flavours",
    description: "Discover authentic sun-dried seafood straight from Dahanu's coastline. Easy WhatsApp ordering.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body className="bg-cream text-navy min-h-screen flex flex-col antialiased selection:bg-brandOrange selection:text-white">
        <SmoothScroll>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
