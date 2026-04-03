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
    return encodeURIComponent(`Hello Ashraf & Hesham, I'd like to order:\n\n${itemsList}\n\nTotal: ${total} LYD`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-24 bg-zinc-950 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="text-zinc-700" size={48} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Your cart is empty</h1>
        <p className="text-zinc-500 mb-8 text-center max-w-md">
          Looks like you haven't added any Mercedes parts to your cart yet. 
          Explore our catalog to find what you need.
        </p>
        <Link 
          to="/catalog" 
          className="bg-white text-black px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2"
        >
          Browse Catalog <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm flex gap-6 items-center"
                >
                  <div className="w-24 h-24 bg-black rounded-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || 'https://picsum.photos/seed/part/200/200'} 
                      alt={item.name} 
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">
                      {item.partNumber}
                    </div>
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                    <div className="text-zinc-400 text-sm mt-1">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg mb-2">{item.price} LYD</div>
                    <button 
                      onClick={() => removeItem(index)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>{total} LYD</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-xs uppercase tracking-widest">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span>{total} LYD</span>
                </div>
              </div>
              
              <a
                href={`https://wa.me/01129991742?text=${whatsappMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mb-4"
              >
                Checkout via WhatsApp <Phone size={16} />
              </a>
              <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest">
                Secure checkout &bull; Direct expert support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
