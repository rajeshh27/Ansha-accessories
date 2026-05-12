import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const { items, subtotal, remove, setQty } = useCart();
  const shipping = subtotal > 999 ? 0 : 99;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-ansha-brown/5 rounded-full flex items-center justify-center mx-auto mb-8 text-ansha-muted">
          <ShoppingBag size={40} />
        </div>
        <h1 className="font-serif italic text-4xl text-ansha-brown mb-6">Your cart is empty</h1>
        <p className="text-ansha-muted mb-10 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest collections to find something special.</p>
        <Link to="/collections/all" className="inline-block bg-ansha-rust text-ansha-beige px-10 py-4 text-xs tracking-[0.4em] hover:bg-ansha-accent transition-colors">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6EF] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif italic text-4xl text-ansha-brown mb-12">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {items.map((item) => (
                <motion.div 
                  layout
                  key={item.id} 
                  className="flex gap-6 pb-8 border-b border-ansha-brown/10 group"
                >
                  <Link to={`/products/${item.id}`} className="block w-24 h-32 sm:w-32 sm:h-40 bg-gray-100 overflow-hidden rounded-sm flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <Link to={`/products/${item.id}`} className="font-serif italic text-xl text-ansha-brown hover:text-ansha-rust transition-colors">{item.name}</Link>
                        <button onClick={() => remove(item.id)} className="text-ansha-muted hover:text-red-500 transition-colors p-1">
                          <X size={18} />
                        </button>
                      </div>
                      <p className="text-xs tracking-widest text-ansha-rust uppercase mb-4">{item.category}</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-ansha-brown/10 rounded-full px-3 py-1 bg-white">
                          <button onClick={() => setQty(item.id, item.qty - 1)} className="p-1 text-ansha-brown hover:text-ansha-rust transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                          <button onClick={() => setQty(item.id, item.qty + 1)} className="p-1 text-ansha-brown hover:text-ansha-rust transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right sm:text-left">
                      <p className="font-serif text-lg text-ansha-brown">Rs. {item.price * item.qty}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link to="/collections/all" className="inline-flex items-center gap-2 text-ansha-rust text-xs tracking-widest font-medium mt-10 hover:gap-3 transition-all uppercase">
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-ansha-brown/5 sticky top-32">
              <h2 className="font-serif italic text-2xl text-ansha-brown mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex justify-between text-ansha-muted">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-ansha-muted">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `Rs. ${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-ansha-rust tracking-wide italic">Add Rs. {999 - subtotal} more for Free Shipping</p>
                )}
                <div className="border-t border-ansha-brown/10 pt-4 mt-4 flex justify-between text-lg text-ansha-brown font-serif italic">
                  <span>Total</span>
                  <span>Rs. {subtotal + shipping}</span>
                </div>
              </div>

              <button className="w-full bg-ansha-brown text-ansha-beige py-4 text-xs tracking-[0.4em] hover:bg-ansha-rust transition-colors shadow-lg hover:shadow-ansha-rust/20">
                PROCEED TO CHECKOUT
              </button>

              <div className="mt-8 pt-8 border-t border-ansha-brown/5 space-y-4">
                <div className="flex items-center gap-3 text-[11px] text-ansha-muted tracking-wider uppercase">
                  <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                  Secure Payments
                </div>
                <div className="flex items-center gap-3 text-[11px] text-ansha-muted tracking-wider uppercase">
                  <div className="w-5 h-5 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                  Express Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
