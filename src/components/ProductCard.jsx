import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { add } = useCart();
  
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.soldOut) return;
    add(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group block"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden bg-[#F5EFE6] aspect-square mb-3">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          {product.tag && (
            <span className="absolute top-3 left-3 bg-ansha-accent text-ansha-beige text-[10px] tracking-widest px-2.5 py-1">
              {product.tag.toUpperCase()}
            </span>
          )}
          {product.soldOut && (
            <span className="absolute top-3 right-3 bg-ansha-beige text-ansha-brown text-[10px] tracking-widest px-2.5 py-1 border border-ansha-brown">
              SOLD OUT
            </span>
          )}
          <button 
            onClick={handleAdd} 
            disabled={product.soldOut} 
            className="absolute bottom-0 left-0 right-0 bg-ansha-brown text-ansha-beige text-xs tracking-[0.3em] py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:bg-[#8A7660] disabled:cursor-not-allowed"
          >
            {product.soldOut ? 'SOLD OUT' : 'ADD TO CART'}
          </button>
        </div>
        <h3 className="text-sm text-ansha-brown group-hover:text-ansha-rust transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-ansha-accent mt-1">Rs. {product.price.toFixed(2)}</p>
      </Link>
    </motion.div>
  );
}
