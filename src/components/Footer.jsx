import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ansha-brown text-ansha-beige pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col mb-6">
              <span className="font-serif italic text-2xl text-[#E8C9A8]">Ansha</span>
              <span className="text-[10px] tracking-[0.4em] text-[#C8A788] uppercase">Accessories</span>
            </div>
            <p className="text-sm leading-relaxed text-[#D8C0A0]/80 max-w-xs">
              Premium hair claws, jewelry & accessories. Elegant hair bows, scrunchies, and curated gift hampers delivered across India.
            </p>
          </div>

          <div>
            <h4 className="font-serif italic text-[#E8C9A8] text-lg mb-6">Collections</h4>
            <ul className="space-y-3 text-sm text-[#D8C0A0]/70">
              <li><Link to="/collections/jewelry" className="hover:text-[#E8C9A8] transition-colors">Jewelry Edit</Link></li>
              <li><Link to="/collections/hair" className="hover:text-[#E8C9A8] transition-colors">Hair Accessories</Link></li>
              <li><Link to="/collections/hampers" className="hover:text-[#E8C9A8] transition-colors">Gift Hampers</Link></li>
              <li><Link to="/collections/bouquet" className="hover:text-[#E8C9A8] transition-colors">Bouquet Collections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-[#E8C9A8] text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-[#D8C0A0]/70">
              <li><Link to="/faq" className="hover:text-[#E8C9A8] transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-[#E8C9A8] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/track" className="hover:text-[#E8C9A8] transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-[#E8C9A8] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-[#E8C9A8] text-lg mb-6">Connect</h4>
            <p className="text-sm text-[#D8C0A0]/70 mb-6">Join our newsletter for exclusive drops and styling stories.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#D8C0A0]/20 flex items-center justify-center hover:bg-ansha-rust hover:border-ansha-rust transition-all duration-300">
                <Camera size={18} />
              </a>
              <a href="https://wa.me/917358874440" className="w-10 h-10 rounded-full border border-[#D8C0A0]/20 flex items-center justify-center hover:bg-ansha-rust hover:border-ansha-rust transition-all duration-300">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#D8C0A0]/20 flex items-center justify-center hover:bg-ansha-rust hover:border-ansha-rust transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#A0866C] tracking-wider uppercase">
          <span>© {new Date().getFullYear()} Ansha Accessories.</span>
          <div className="flex items-center gap-2 opacity-60">
            <MapPin size={12} /> Handcrafted & Delivered across India
          </div>
        </div>
      </div>
    </footer>
  );
}
