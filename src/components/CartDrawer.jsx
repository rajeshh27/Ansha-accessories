import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, drawerOpen, close, setQty, remove, subtotal } = useCart();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          />
          
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-ansha-beige flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-ansha-brown/10">
              <h3 className="font-serif italic text-2xl text-ansha-brown">Your Cart</h3>
              <button onClick={close} className="text-ansha-brown hover:text-ansha-rust transition-colors">
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <ShoppingBag size={56} className="text-[#C9B8A0] mb-4 opacity-50" />
                <p className="text-ansha-muted mb-6">Your cart is empty</p>
                <Link to="/collections/all" onClick={close} className="bg-ansha-rust hover:bg-[#9F4F32] text-ansha-beige px-8 py-3.5 text-xs tracking-[0.3em] transition-all duration-300">
                  START SHOPPING
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                  {items.map((it) => (
                    <div key={it.id} className="flex gap-4 group">
                      <div className="w-20 h-24 flex-none bg-[#F5EFE6] overflow-hidden">
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between gap-2">
                          <h4 className="text-sm text-ansha-brown line-clamp-2 leading-snug">{it.name}</h4>
                          <button onClick={() => remove(it.id)} className="text-ansha-muted hover:text-ansha-rust transition-colors flex-none">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-ansha-accent mt-1">Rs. {it.price.toFixed(2)}</p>
                        <div className="mt-auto flex items-center gap-3">
                          <div className="flex items-center border border-ansha-brown/20 bg-white/50">
                            <button onClick={() => setQty(it.id, it.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-ansha-brown hover:text-ansha-beige transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs">{it.qty}</span>
                            <button onClick={() => setQty(it.id, it.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-ansha-brown hover:text-ansha-beige transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-ansha-brown/10 px-6 py-8 bg-white/20">
                  <div className="flex justify-between text-ansha-brown mb-2">
                    <span className="text-sm tracking-wide">Subtotal</span>
                    <span className="font-serif italic text-xl">Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-ansha-muted mb-6 tracking-wide">Shipping calculated at checkout · Free above Rs. 999</p>
                  <div className="space-y-3">
                    <Link to="/cart" onClick={close} className="block text-center border border-ansha-brown text-ansha-brown hover:bg-ansha-brown hover:text-ansha-beige py-3.5 text-xs tracking-[0.3em] transition-all duration-300">
                      VIEW FULL CART
                    </Link>
                    <button className="w-full bg-ansha-rust hover:bg-[#9F4F32] text-ansha-beige py-4 text-xs tracking-[0.3em] transition-all duration-300 shadow-md">
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
