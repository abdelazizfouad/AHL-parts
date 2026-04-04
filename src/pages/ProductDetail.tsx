import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, db } from '../lib/firebase';
import { Product } from '../types';
import { ShoppingCart, ArrowLeft, Phone, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          navigate('/catalog');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    window.dispatchEvent(new Event('cart-updated'));
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-2 border-blue-900/10 border-t-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="py-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link to="/catalog" className="inline-flex items-center gap-3 text-zinc-500 hover:text-blue-400 transition-all mb-12 text-[11px] font-bold uppercase tracking-[0.3em] group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/5] bg-blue-900/5 border border-blue-500/20 overflow-hidden group">
              <img
                src={product.image || 'https://picsum.photos/seed/part/1200/1500'}
                alt={product.name}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.4em]">{product.category}</span>
                <div className="h-[1px] w-8 bg-blue-500/30" />
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.4em]">{product.partNumber}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-medium text-white tracking-tighter mb-8 leading-tight uppercase">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-12">
                <span className="text-5xl font-medium text-white tracking-tighter">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-[12px] text-blue-500/60 font-bold uppercase tracking-widest">EGP</span>
              </div>

              <div className="space-y-10">
                <div className="relative pl-8 border-l border-blue-500/30">
                  <h3 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Compatibility</h3>
                  <p className="text-white font-medium text-xl tracking-tight">{product.compatibility}</p>
                </div>
                
                {product.description && (
                  <div className="relative pl-8 border-l border-blue-500/30">
                    <h3 className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Engineering Details</h3>
                    <p className="text-zinc-300 font-normal leading-relaxed text-base">{product.description}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={addToCart}
                disabled={added}
                className={`group relative py-6 overflow-hidden transition-all duration-500 border ${
                  added ? 'bg-green-600 border-green-600 text-white' : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                }`}
              >
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                  {added ? (
                    <> <CheckCircle2 size={18} /> Added to Collection </>
                  ) : (
                    <> <ShoppingCart size={18} /> Add to Collection </>
                  )}
                </span>
              </button>
              
              <a
                href={`https://wa.me/01129991742?text=I'm interested in ${product.name} (Part #: ${product.partNumber})`}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-blue-500/20 text-zinc-400 py-6 hover:border-blue-500 hover:text-blue-400 transition-all duration-500 flex items-center justify-center gap-3"
              >
                <Phone size={18} className="text-zinc-600 group-hover:text-blue-400 transition-colors" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Order via WhatsApp</span>
              </a>
            </div>

            <div className="mt-16 pt-12 border-t border-blue-900/10 grid grid-cols-2 gap-12">
              <div className="space-y-3">
                <ShieldCheck className="text-blue-500" size={28} strokeWidth={1.5} />
                <h4 className="text-white font-medium text-base tracking-tight uppercase">Genuine Component</h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed uppercase tracking-wider font-bold">100% Authentic Mercedes-Benz</p>
              </div>
              <div className="space-y-3">
                <CheckCircle2 className="text-blue-500" size={28} strokeWidth={1.5} />
                <h4 className="text-white font-medium text-base tracking-tight uppercase">Precision Tested</h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed uppercase tracking-wider font-bold">Engineered for Performance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
