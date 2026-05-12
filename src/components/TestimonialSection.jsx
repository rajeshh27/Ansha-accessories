import React, { useState } from 'react';
import { TESTIMONIALS } from '../mock';
import { Quote, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-[#F5EFE6] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.4em] text-ansha-rust uppercase">LOVE NOTES</span>
          <h2 className="font-serif italic text-4xl sm:text-5xl text-ansha-brown mt-4">What Our Customers Say</h2>
          <p className="text-sm text-ansha-muted mt-4 opacity-70">(Click image to view details)</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-ansha-beige p-8 border border-ansha-brown/5 hover:shadow-xl transition-all duration-500 flex flex-col relative"
            >
              <Quote className="text-ansha-rust/20 absolute top-6 right-6" size={40} />
              <p className="text-sm text-ansha-brown leading-relaxed mb-8 flex-1 italic">"{t.text}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-ansha-brown/5">
                <button 
                  onClick={() => setActive(t)} 
                  className="w-14 h-14 rounded-full overflow-hidden border-2 border-ansha-brown/10 hover:border-ansha-rust transition-colors shadow-sm"
                >
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </button>
                <div>
                  <div className="font-serif italic text-ansha-accent font-medium">{t.name}</div>
                  <div className="text-[10px] text-ansha-muted tracking-widest uppercase">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setActive(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ansha-beige max-w-2xl w-full p-8 sm:p-12 relative shadow-2xl overflow-hidden" 
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-ansha-brown hover:text-ansha-rust transition-colors">
                <X size={24} />
              </button>
              <div className="grid sm:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/5] overflow-hidden shadow-lg">
                  <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <Quote className="text-ansha-rust/20 mb-4" size={40} />
                  <p className="text-sm text-ansha-brown leading-relaxed mb-6 italic">"{active.text}"</p>
                  <div className="pt-6 border-t border-ansha-brown/10">
                    <div className="font-serif italic text-xl text-ansha-accent">{active.name}</div>
                    <div className="text-xs text-ansha-muted tracking-wide mb-4 uppercase">{active.location}</div>
                    <p className="text-xs text-ansha-muted leading-relaxed opacity-80">{active.note}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
