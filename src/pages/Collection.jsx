import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../mock';
import ProductCard from '../components/ProductCard';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Collection() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();
  const [sort, setSort] = useState('featured');

  const cat = CATEGORIES.find((c) => c.id === slug);
  const title = slug === 'all' ? 'All Products' : (cat?.name || slug.charAt(0).toUpperCase() + slug.slice(1));

  const products = useMemo(() => {
    let list = slug === 'all' ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === slug);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [slug, q, sort]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-ansha-beige min-h-screen"
    >
      <div className="bg-[#F5EFE6] border-b border-ansha-brown/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-[10px] tracking-widest text-ansha-muted mb-4 uppercase">
            <Link to="/" className="hover:text-ansha-rust">Home</Link>
            <ChevronRight size={10} />
            <span className="text-ansha-brown font-medium">{title}</span>
          </nav>
          <h1 className="font-serif italic text-4xl sm:text-5xl text-ansha-brown">{title}</h1>
          <p className="text-sm text-ansha-muted mt-3 opacity-80">{products.length} products{q ? ` matching “${q}”` : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <button className="flex items-center gap-2 text-xs tracking-[0.2em] text-ansha-brown uppercase border-b border-ansha-brown/20 pb-1">
            <SlidersHorizontal size={14} />
            <span>Filter</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest text-ansha-muted uppercase hidden sm:block">Sort by:</span>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)} 
              className="bg-transparent border border-ansha-brown/10 text-ansha-brown text-xs tracking-wide px-3 py-2 focus:outline-none focus:border-ansha-rust cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-serif italic text-2xl text-ansha-muted">No products found. Try a different search.</p>
            <Link to="/collections/all" className="inline-block mt-6 text-xs tracking-[0.3em] text-ansha-rust border-b border-ansha-rust/30 pb-1">BROWSE ALL</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
