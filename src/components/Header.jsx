import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { LOGO_URL, CATEGORIES } from '../mock';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/collections/all?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-ansha-beige/95 backdrop-blur-md border-b border-ansha-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setMenuOpen(true)} className="lg:hidden text-ansha-brown" aria-label="Menu">
            <Menu size={24} />
          </button>

          <nav className="hidden lg:flex items-center gap-8 flex-1">
            <Link to="/" className="text-ansha-brown hover:text-ansha-rust text-sm tracking-wide transition-colors">Home</Link>
            <Link to="/collections/all" className="text-ansha-brown hover:text-ansha-rust text-sm tracking-wide transition-colors">Shop All</Link>
            <Link to="/collections/jewelry" className="text-ansha-brown hover:text-ansha-rust text-sm tracking-wide transition-colors">Jewelry</Link>
          </nav>

          <Link to="/" className="flex items-center gap-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <div className="flex flex-col leading-none items-center">
              <span className="font-serif text-2xl text-ansha-accent italic">Ansha</span>
              <span className="text-[10px] tracking-[0.3em] text-ansha-rust uppercase">Accessories</span>
            </div>
          </Link>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <button onClick={() => setSearchOpen(true)} className="text-ansha-brown hover:text-ansha-rust transition-colors">
              <Search size={20} />
            </button>
            <button onClick={open} className="relative text-ansha-brown hover:text-ansha-rust transition-colors">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-ansha-rust text-ansha-beige text-[10px] font-medium rounded-full h-4 min-w-4 px-1 flex items-center justify-center">{count}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-ansha-beige border-b border-ansha-brown/10 shadow-lg">
          <form onSubmit={submitSearch} className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
            <Search size={18} className="text-ansha-accent" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products..." className="flex-1 bg-transparent border-b border-ansha-brown/20 py-2 text-ansha-brown placeholder:text-ansha-muted/50 focus:outline-none focus:border-ansha-rust" />
            <button type="button" onClick={() => setSearchOpen(false)} className="text-ansha-brown"><X size={20} /></button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-ansha-beige p-6 overflow-y-auto shadow-2xl transition-transform duration-300">
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-xl text-ansha-accent italic">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-ansha-brown"><X size={22} /></button>
            </div>
            <nav className="flex flex-col gap-1">
              <Link to="/" onClick={() => setMenuOpen(false)} className="py-3 border-b border-ansha-brown/10 text-ansha-brown">Home</Link>
              <Link to="/collections/all" onClick={() => setMenuOpen(false)} className="py-3 border-b border-ansha-brown/10 text-ansha-brown">Shop All</Link>
              {CATEGORIES.slice(0, 5).map((c) => (
                <Link key={c.id} to={`/collections/${c.id}`} onClick={() => setMenuOpen(false)} className="py-3 border-b border-ansha-brown/10 text-ansha-brown">{c.name}</Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
