import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";
import PackagesSection from "@/components/PackagesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingCTA from "@/components/BookingCTA";
import WhatsappButton from "@/components/WhatsappButton";
import { getGallery, getTestimonials, getPackages } from "@/lib/sanity";
import gallery from "@/sanity/schemaTypes/gallery";

export default async function Home() {

  const gallery = await getGallery();
  const testimonials = await getTestimonials();
  const packages = await getPackages();

  return (
    <>
      <Hero />
      <PackagesSection packages={packages} />
      <GallerySection gallery={gallery} />
      <TestimonialsSection testimonials={testimonials} />
      <BookingCTA />
      <WhatsappButton />
    </>
  );
}