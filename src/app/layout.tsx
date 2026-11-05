import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import { ProductProvider } from "@/context/ProductContext";
import { siteConfig } from "@/config/site";

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
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-navy min-h-screen flex flex-col antialiased selection:bg-brandOrange selection:text-white">
        <SmoothScroll>
          <Header />
          <ProductProvider>
            <main className="flex-grow">{children}</main>
          </ProductProvider>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
