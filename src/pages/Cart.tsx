import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Trash2, ShoppingBag, ArrowRight, Phone, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const removeItem = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const whatsappMessage = () => {
    const itemsList = cartItems.map(item => `- ${item.name} (${item.partNumber})`).join('\n');
    return encodeURIComponent(`Hello Ashraf & Hesham, I'd like to order:\n\n${itemsList}\n\nTotal: ${total.toLocaleString()} EGP`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-40 bg-black min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 border border-white/5 rounded-full flex items-center justify-center mb-12 relative"
        >
          <ShoppingBag className="text-zinc-800" size={48} strokeWidth={1} />
          <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-20" />
        </motion.div>
        <h1 className="text-4xl font-light text-white mb-6 tracking-tighter">Your Collection is Empty</h1>
        <p className="text-zinc-500 mb-12 text-center max-w-md font-light leading-relaxed">
          The finest Mercedes-Benz components await your selection. 
          Explore our curated inventory to begin your journey.
        </p>
        <Link 
          to="/catalog" 
          className="group relative bg-white text-black px-12 py-5 overflow-hidden transition-all duration-500"
        >
          <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
            Browse Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-baseline gap-6 mb-20">
          <h1 className="text-6xl font-light text-white tracking-tighter">Collection</h1>
          <span className="text-zinc-700 text-xl font-light">/ {cartItems.length} Items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="group bg-zinc-900/10 border border-white/5 p-8 flex gap-8 items-center hover:bg-zinc-900/20 transition-colors"
                >
                  <div className="w-32 h-32 bg-black border border-white/5 overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={item.image || 'https://picsum.photos/seed/part/400/400'} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{item.partNumber}</span>
                      <div className="h-[1px] w-4 bg-zinc-800" />
                      <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{item.category}</span>
                    </div>
                    <h3 className="text-white font-light text-2xl tracking-tight mb-2">{item.name}</h3>
                    <div className="text-zinc-500 text-xs font-light italic">Genuine Component</div>
                  </div>
                  <div className="text-right flex flex-col justify-between h-32">
                    <div className="text-2xl font-light text-white tracking-tighter">
                      {item.price.toLocaleString()} <span className="text-[10px] text-zinc-600 ml-1 uppercase">EGP</span>
                    </div>
                    <button 
                      onClick={() => removeItem(index)}
                      className="text-zinc-700 hover:text-white transition-colors p-2 self-end group/del"
                    >
                      <Trash2 size={18} strokeWidth={1.5} className="group-hover/del:scale-110 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-zinc-900/20 border border-white/5 p-10 sticky top-32">
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-10">Order Summary</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-sm font-light">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="text-white tracking-tight">{total.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between text-sm font-light">
                  <span className="text-zinc-500">Logistics</span>
                  <span className="text-zinc-700 italic text-[10px] uppercase tracking-widest">Calculated at Checkout</span>
                </div>
                <div className="h-[1px] w-full bg-white/5 my-8" />
                <div className="flex justify-between items-baseline">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Total Value</span>
                  <span className="text-4xl font-light text-white tracking-tighter">
                    {total.toLocaleString()} <span className="text-[10px] text-zinc-600 ml-1 uppercase tracking-widest">EGP</span>
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <a
                  href={`https://wa.me/01129991742?text=${whatsappMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full bg-white text-black py-6 overflow-hidden transition-all duration-500 flex items-center justify-center gap-3"
                >
                  <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                    Checkout via WhatsApp <Phone size={14} />
                  </span>
                </a>
                <p className="text-[8px] text-zinc-600 text-center uppercase tracking-[0.3em] leading-relaxed">
                  Secure Transaction &bull; Direct Expert Consultation &bull; Priority Logistics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
