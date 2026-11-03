import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import StorySection from "@/components/StorySection";
import CategorySection from "@/components/CategorySection";
import Testimonials from "@/components/Testimonials";
import InstagramGallery from "@/components/InstagramGallery";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Introduction */}
      <BrandIntro />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Our Story */}
      <StorySection />

      {/* 6. Product Categories */}
      <CategorySection />

      {/* 7. Customer Testimonials */}
      <Testimonials />

      {/* 8. Instagram Gallery */}
      <InstagramGallery />

      {/* 9. WhatsApp CTA Section */}
      <WhatsAppCTA />
    </>
  );
}
