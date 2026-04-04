import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Phone, ShieldCheck, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Admin from './pages/Admin';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  const handleCartUpdate = React.useCallback(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(Array.isArray(cart) ? cart.length : 0);
    } catch (e) {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    handleCartUpdate();
    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [handleCartUpdate]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/catalog' },
    { name: 'Heritage', path: '/about' },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-xl text-white fixed top-0 left-0 right-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-3">
              <div className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-colors duration-500">
                <div className="w-1 h-1 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-medium tracking-tight text-white group-hover:text-blue-400 transition-colors uppercase">ASHRAF & HESHAM</span>
                <span className="text-[8px] font-bold tracking-[0.5em] text-zinc-500 uppercase -mt-1 group-hover:text-blue-900 transition-colors">Mercedes-Benz Technical Precision</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-blue-400 ${
                    location.pathname === link.path ? 'text-blue-500' : 'text-zinc-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <Link to="/admin" className="text-zinc-500 hover:text-blue-500 transition-colors">
              <Settings size={16} strokeWidth={2} />
            </Link>
            <Link to="/cart" className="group relative py-2">
              <ShoppingCart size={18} strokeWidth={2} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-2 bg-blue-600 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-400 hover:text-blue-500 transition-colors"
              >
                {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black border-b border-blue-500/10"
          >
            <div className="px-6 pt-4 pb-12 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-[11px] font-bold uppercase tracking-[0.4em] py-2 transition-colors ${
                    location.pathname === link.path ? 'text-blue-500' : 'text-zinc-400 hover:text-blue-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black text-white py-32 border-t border-blue-900/20">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-6 border border-blue-500/20 flex items-center justify-center">
              <div className="w-1 h-1 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </div>
            <h3 className="text-2xl font-medium tracking-tight uppercase text-white">ASHRAF & HESHAM</h3>
          </div>
          <p className="text-zinc-400 text-base font-normal leading-relaxed max-w-sm">
            Dedicated to the preservation of Mercedes-Benz engineering excellence. 
            Supplying genuine components for the discerning driver across Egypt and Libya.
          </p>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-8">Contact</h3>
          <ul className="space-y-4 text-zinc-400 text-base font-normal">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-blue-500" />
              <a href="tel:01129991742" className="hover:text-blue-400 transition-colors tracking-tight">01129991742</a>
            </li>
            <li className="tracking-tight">Cairo, Egypt</li>
            <li className="tracking-tight">Tripoli, Libya</li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-8">Navigation</h3>
          <ul className="grid grid-cols-2 gap-4 text-zinc-400 text-base font-normal">
            <li><Link to="/catalog" className="hover:text-blue-400 transition-colors tracking-tight">Collection</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors tracking-tight">Heritage</Link></li>
            <li><Link to="/admin" className="hover:text-blue-400 transition-colors tracking-tight">Portal</Link></li>
            <li><Link to="/cart" className="hover:text-blue-400 transition-colors tracking-tight">Cart</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-32 pt-12 border-t border-blue-900/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.5em]">
          &copy; {new Date().getFullYear()} ASHRAF & HESHAM. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          <span className="hover:text-blue-500 cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-blue-500 cursor-pointer transition-colors">Terms</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 flex flex-col font-sans selection:bg-white selection:text-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/01129991742"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-500 transition-all hover:scale-110 z-50"
        >
          <Phone size={24} />
        </a>
      </div>
    </Router>
  );
}
