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
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
        <Loader2 className="text-white animate-spin mb-4" size={48} />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="py-12 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden aspect-square flex items-center justify-center"
          >
            <img
              src={product.image || 'https://picsum.photos/seed/part/800/800'}
              alt={product.name}
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">
              {product.category} &bull; {product.partNumber}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">{product.name}</h1>
            
            <div className="text-3xl font-bold text-white mb-8">
              {product.price.toLocaleString()} <span className="text-sm text-zinc-500 font-bold">ج.م</span>
            </div>

            <div className="space-y-6 mb-10">
              <div className="bg-zinc-900 p-4 border border-zinc-800 rounded-sm">
                <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Compatibility</h3>
                <p className="text-white">{product.compatibility}</p>
              </div>
              
              {product.description && (
                <div>
                  <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Description</h3>
                  <p className="text-zinc-400 leading-relaxed">{product.description}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addToCart}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest transition-all ${
                  added ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {added ? (
                  <> <CheckCircle2 size={18} /> Added to Cart </>
                ) : (
                  <> <ShoppingCart size={18} /> Add to Cart </>
                )}
              </button>
              <a
                href={`https://wa.me/01129991742?text=I'm interested in ${product.name} (Part #: ${product.partNumber})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-zinc-700 text-white rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                <Phone size={18} /> Order via WhatsApp
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-zinc-500 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-bold text-sm">Genuine Part</h4>
                  <p className="text-zinc-500 text-xs">100% Authentic Mercedes-Benz component.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-zinc-500 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-bold text-sm">Quality Tested</h4>
                  <p className="text-zinc-500 text-xs">Inspected for performance and durability.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
