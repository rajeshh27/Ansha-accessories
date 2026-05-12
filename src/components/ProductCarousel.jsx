import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function ProductCarousel({ title, eyebrow, products, viewAllHref }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          {eyebrow && <span className="text-xs tracking-[0.4em] text-ansha-rust">{eyebrow}</span>}
          <h2 className="font-serif italic text-3xl sm:text-4xl text-ansha-brown mt-2">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => scrollBy(-1)} 
            className="w-10 h-10 border border-ansha-brown/20 hover:border-ansha-rust hover:bg-ansha-rust hover:text-ansha-beige text-ansha-brown flex items-center justify-center transition-all duration-300 rounded-full" 
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => scrollBy(1)} 
            className="w-10 h-10 border border-ansha-brown/20 hover:border-ansha-rust hover:bg-ansha-rust hover:text-ansha-beige text-ansha-brown flex items-center justify-center transition-all duration-300 rounded-full" 
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef} 
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 -mx-4 px-4 hide-scrollbar"
      >
        {products.map((p) => (
          <div key={p.id} className="flex-none w-56 sm:w-64 snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {viewAllHref && (
        <div className="mt-4 text-center">
          <Link to={viewAllHref} className="inline-block text-[10px] tracking-[0.4em] text-ansha-accent border-b border-ansha-accent/30 pb-1 hover:text-ansha-rust hover:border-ansha-rust transition-all duration-300 uppercase">
            View All Collection
          </Link>
        </div>
      )}
    </section>
  );
}
