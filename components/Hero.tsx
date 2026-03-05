"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* 🎥 Desktop Video */}
      <div className="hidden md:block absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 📱 Mobile Fallback Image */}
      <div className="absolute inset-0 md:hidden bg-[url('/hero-poster.png')] bg-cover bg-center" />

      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🎨 Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-charcoal" />

      {/* 💎 Glass Luxury Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">

          <span className="inline-block py-1 px-4 border border-gold-500/50 rounded-full text-gold-500 text-sm mb-6">
            Premium Entertainment Services
          </span>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Elevate Your Event with
            <span className="text-gold-500 block">Rumah Nada</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Pengalaman entertainment eksklusif untuk wedding, corporate event, dan private party Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#packages"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Lihat Paket <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Konsultasi Gratis
            </a>
          </div>

        </div>
      </motion.div>

      {/* 👇 Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-gold-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold-500 rounded-full" />
        </div>
      </div>

    </section>
  );
}