import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../mock';
import { useCart } from '../context/CartContext';
import { ChevronRight, Minus, Plus, Heart, Truck, ShieldCheck, MessageCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-ansha-brown px-4 text-center">
        <p className="font-serif italic text-2xl mb-4">The piece you are looking for has flown away.</p>
        <Link to="/collections/all" className="text-xs tracking-[0.3em] border-b border-ansha-rust text-ansha-rust pb-1 hover:text-ansha-brown hover:border-ansha-brown transition-colors uppercase">BROWSE COLLECTIONS</Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-ansha-beige pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-[10px] tracking-widest text-ansha-muted mb-8 uppercase">
          <Link to="/" className="hover:text-ansha-rust">Home</Link>
          <ChevronRight size={10} />
          <Link to={`/collections/${product.category}`} className="hover:text-ansha-rust">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-ansha-brown font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-4">
            <div className="bg-[#F5EFE6] aspect-square overflow-hidden shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
               <div className="bg-[#F5EFE6] aspect-square opacity-50 cursor-not-allowed"></div>
               <div className="bg-[#F5EFE6] aspect-square opacity-50 cursor-not-allowed"></div>
               <div className="bg-[#F5EFE6] aspect-square opacity-50 cursor-not-allowed"></div>
            </div>
          </div>

          <div className="lg:pt-4">
            <span className="text-xs tracking-[0.4em] text-ansha-rust uppercase">{product.category}</span>
            <h1 className="font-serif italic text-4xl sm:text-5xl text-ansha-brown mt-4 leading-tight">{product.name}</h1>
            <p className="text-2xl text-ansha-accent mt-6 font-medium">Rs. {product.price.toFixed(2)}</p>
            <p className="text-[11px] text-ansha-muted mt-2 tracking-wide uppercase opacity-70">Tax included · Shipping calculated at checkout</p>

            <div className="h-px bg-ansha-brown/10 w-full my-8" />

            <p className="text-sm text-ansha-muted leading-relaxed max-w-lg">
              Crafted with love and an eye for delicate detail. This piece from Ansha Accessories brings together elegance and everyday softness — perfect to wear, gift, or keep for those little moments that matter.
            </p>

            <div className="mt-10">
              <label className="text-[10px] tracking-[0.3em] text-ansha-brown uppercase font-semibold">QUANTITY</label>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center border border-ansha-brown/20 bg-white/30">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 text-ansha-brown hover:bg-ansha-brown hover:text-ansha-beige transition-colors flex items-center justify-center"><Minus size={14} /></button>
                  <span className="w-12 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-12 h-12 text-ansha-brown hover:bg-ansha-brown hover:text-ansha-beige transition-colors flex items-center justify-center"><Plus size={14} /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button 
                onClick={() => add(product, qty)} 
                className="flex-1 bg-ansha-rust hover:bg-[#9F4F32] text-ansha-beige py-4 text-xs tracking-[0.3em] transition-all duration-300 shadow-md uppercase"
              >
                ADD TO CART
              </button>
              <button 
                onClick={() => { add(product, qty); navigate('/cart'); }} 
                className="flex-1 border border-ansha-brown text-ansha-brown hover:bg-ansha-brown hover:text-ansha-beige py-4 text-xs tracking-[0.3em] transition-all duration-300 uppercase"
              >
                BUY IT NOW
              </button>
              <button className="w-14 border border-ansha-brown/20 text-ansha-brown hover:border-ansha-rust hover:text-ansha-rust flex items-center justify-center transition-all duration-300">
                <Heart size={20} />
              </button>
            </div>

            <div className="mt-12 space-y-4 border-t border-ansha-brown/5 pt-10">
              <div className="flex items-start gap-4 text-ansha-brown group">
                <div className="w-10 h-10 rounded-full bg-ansha-rust/5 flex items-center justify-center flex-none group-hover:bg-ansha-rust transition-colors duration-300 group-hover:text-ansha-beige">
                  <Truck size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium">Free India Shipping</div>
                  <div className="text-[11px] text-ansha-muted mt-0.5">Complimentary for orders above Rs. 999. Delivered in 2-5 days.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 text-ansha-brown group">
                <div className="w-10 h-10 rounded-full bg-ansha-rust/5 flex items-center justify-center flex-none group-hover:bg-ansha-rust transition-colors duration-300 group-hover:text-ansha-beige">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium">Hand-written Notes</div>
                  <div className="text-[11px] text-ansha-muted mt-0.5">Add a personal touch with our complimentary handwritten messages.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-32">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs tracking-[0.4em] text-ansha-rust">GENTLE SUGGESTIONS</span>
                <h2 className="font-serif italic text-3xl sm:text-4xl text-ansha-brown mt-2">You May Also Love</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
