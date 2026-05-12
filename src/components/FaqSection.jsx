import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../mock';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.4em] text-ansha-rust uppercase">QUESTIONS</span>
        <h2 className="font-serif italic text-4xl text-ansha-brown mt-4">Frequently Asked</h2>
      </div>
      
      <div className="space-y-4">
        {FAQS.map((f, i) => (
          <div key={i} className="border border-ansha-brown/5 bg-ansha-beige overflow-hidden">
            <button 
              onClick={() => setOpen(open === i ? -1 : i)} 
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group transition-colors"
            >
              <span className={`text-sm sm:text-base transition-colors ${open === i ? 'text-ansha-rust' : 'text-ansha-brown group-hover:text-ansha-rust'}`}>
                {f.q}
              </span>
              <div className={`w-8 h-8 rounded-full border border-ansha-brown/5 flex items-center justify-center transition-all duration-300 ${open === i ? 'bg-ansha-rust text-ansha-beige border-ansha-rust rotate-180' : 'bg-white text-ansha-rust'}`}>
                {open === i ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            
            <AnimatePresence>
              {open === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 text-sm text-ansha-muted leading-relaxed max-w-3xl opacity-80 border-t border-ansha-brown/5 pt-4">
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
