import React from 'react';
import { Link } from 'react-router-dom';
import { TOP_AUDIENCES, CATEGORIES } from '../mock';
import { motion } from 'framer-motion';

export function AudienceStrip() {
  return (
    <section className="bg-[#F5EFE6] py-10 border-y border-ansha-brown/5">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-4 gap-4 sm:gap-8 text-center">
        {TOP_AUDIENCES.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Link to={`/collections/${a.id}`} className="flex flex-col items-center group">
              <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#E6DCC9] group-hover:border-ansha-rust transition-all duration-300 group-hover:shadow-lg">
                <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="mt-3 text-[10px] sm:text-xs tracking-widest text-ansha-brown group-hover:text-ansha-rust transition-colors uppercase">{a.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs tracking-[0.4em] text-ansha-rust">EXPLORE</span>
          <h2 className="font-serif italic text-4xl sm:text-5xl text-ansha-brown mt-2">Categories</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.slice(0, 6).map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Link to={`/collections/${c.id}`} className="group relative overflow-hidden bg-[#F5EFE6] aspect-[4/5] block shadow-sm">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ansha-brown/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-serif italic text-xl text-ansha-beige mb-1">{c.name}</h3>
                {c.subtitle && <p className="text-[11px] text-ansha-beige/80 line-clamp-2">{c.subtitle}</p>}
                <span className="inline-block mt-2 text-[10px] tracking-[0.3em] text-ansha-beige/60 border-b border-ansha-beige/40 pb-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300">SHOP NOW</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
