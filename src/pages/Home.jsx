import React from 'react';
import HeroSection from '../components/HeroSection';
import { AudienceStrip, CategoryGrid } from '../components/CategorySections';
import ProductCarousel from '../components/ProductCarousel';
import { PRODUCTS } from '../mock';
import { Truck, ShieldCheck, Gift, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above Rs.999' },
  { icon: ShieldCheck, title: 'Quality Promise', desc: 'Carefully handpicked items' },
  { icon: Gift, title: 'Gift Wrapping', desc: 'Personalized hampers & notes' },
  { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Custom requests welcome' },
];

export default function Home() {
  const hampers = PRODUCTS.filter(p => p.category === 'hampers');
  const jewelry = PRODUCTS.filter(p => p.category === 'jewelry');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection />
      <AudienceStrip />
      <CategoryGrid />

      <ProductCarousel 
        eyebrow="GIFTING EDIT" 
        title="Hampers" 
        products={hampers} 
        viewAllHref="/collections/hampers" 
      />

      <section className="bg-[#EFE4D2] py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto bg-ansha-beige rounded-full flex items-center justify-center mb-5 group-hover:bg-ansha-rust group-hover:text-ansha-beige transition-all duration-500 shadow-sm">
                <f.icon size={28} />
              </div>
              <h4 className="font-serif italic text-ansha-brown text-lg">{f.title}</h4>
              <p className="text-[11px] tracking-wide text-ansha-muted mt-2 uppercase">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <ProductCarousel 
        eyebrow="BESTSELLERS" 
        title="Jewellery Collections" 
        products={jewelry} 
        viewAllHref="/collections/jewelry" 
      />
      
      <section className="py-24 bg-ansha-brown text-ansha-beige overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span className="text-xs tracking-[0.6em] text-[#E8C9A8]">ESTABLISHED 2024</span>
            <h2 className="font-serif italic text-4xl sm:text-6xl mt-6 mb-8">Earthy Elegance, <br/>Handcrafted with Care</h2>
            <p className="max-w-2xl mx-auto text-sm leading-relaxed opacity-80 mb-10">
              Ansha Accessories was born from a passion for delicate details and the joy of gifting. We believe in pieces that tell a story — whether it's a simple hair claw for your morning routine or a curated hamper for someone special.
            </p>
            <Link to="/collections/all" className="inline-block bg-[#E8C9A8] text-ansha-brown px-10 py-4 text-xs tracking-[0.4em] hover:bg-ansha-beige transition-colors duration-300">
              DISCOVER OUR STORY
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
