import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ButterflyScene from './ButterflyScene';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] overflow-hidden bg-gradient-to-b from-ansha-beige via-[#F5EFE6] to-[#EFE4D2]">
      <div className="absolute inset-0 opacity-80">
        <ButterflyScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ansha-beige/60 via-transparent to-ansha-beige/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-ansha-rust tracking-[0.4em] text-xs mb-6"
          >
            NEW SEASON · 2026
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif italic text-5xl sm:text-6xl lg:text-7xl text-ansha-brown leading-[1.05] mb-6"
          >
            Where every detail<br />
            <span className="text-ansha-rust">tells a story.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-ansha-muted text-base sm:text-lg max-w-xl leading-relaxed mb-9"
          >
            Handpicked hair claws, dainty jewelry, and curated gift hampers crafted to bring softness to your everyday. Delivered with love across India.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/collections/all" className="group inline-flex items-center gap-2 bg-ansha-rust hover:bg-[#9F4F32] text-ansha-beige px-7 py-3.5 text-sm tracking-widest transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              SHOP THE COLLECTION
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/collections/hampers" className="inline-flex items-center gap-2 border border-ansha-accent text-ansha-accent hover:bg-ansha-accent hover:text-ansha-beige px-7 py-3.5 text-sm tracking-widest transition-colors duration-300">
              GIFT HAMPERS
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
