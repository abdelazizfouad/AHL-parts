import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, getDocs, db } from '../lib/firebase';
import { Product, CATEGORIES } from '../types';
import { Search, Filter, ShoppingCart, Loader2, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ProductCard = React.memo(({ product }: { product: Product }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative bg-black border border-blue-900/10 overflow-hidden hover:border-blue-500/30 transition-all duration-700"
  >
    <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden relative">
      <img
        src={product.image || 'https://picsum.photos/seed/part/800/1000'}
        alt={product.name}
        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      
      <div className="absolute top-4 left-4">
        <div className="bg-blue-600/20 backdrop-blur-md border border-blue-500/20 text-blue-400 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em]">
          {product.category}
        </div>
      </div>
    </Link>

    <div className="p-6 relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[11px] text-blue-500/80 font-bold uppercase tracking-[0.15em] mb-1">
            {product.partNumber}
          </p>
          <Link to={`/product/${product.id}`} className="block text-white font-medium text-xl tracking-tight hover:text-blue-400 transition-colors">
            {product.name}
          </Link>
        </div>
      </div>

      <div className="h-[1px] w-full bg-blue-900/20 mb-6" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">Price</p>
          <span className="text-2xl font-medium text-white tracking-tighter">
            {product.price.toLocaleString()} <span className="text-[11px] text-blue-500/60 ml-1 uppercase font-bold">EGP</span>
          </span>
        </div>
        
        <Link 
          to={`/product/${product.id}`}
          className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-500 group/btn shadow-[0_0_15px_rgba(37,99,235,0.2)]"
        >
          <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
        </Link>
      </div>
    </div>
  </motion.div>
));

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      // Safety timeout to prevent indefinite loading
      const timeoutId = setTimeout(() => {
        if (loading) {
          console.warn("Fetch products timed out. Setting loading to false.");
          setLoading(false);
        }
      }, 15000);

      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.compatibility.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  return (
    <div className="py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <h1 className="text-6xl md:text-8xl font-medium text-white tracking-tighter mb-6">
                Collection<span className="text-blue-600">.</span>
              </h1>
              <p className="text-zinc-400 text-xl max-w-xl font-normal leading-relaxed">
                Explore our curated inventory of genuine Mercedes-Benz components. 
                Engineered for excellence, designed for longevity.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="bg-zinc-900/50 border border-blue-900/20 text-white pl-12 pr-6 py-4 rounded-full focus:outline-none focus:border-blue-500/50 w-full sm:w-80 transition-all font-medium text-sm placeholder:text-zinc-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all border ${
                  showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-transparent text-white border-blue-500/20 hover:border-blue-500/50'
                }`}
              >
                <SlidersHorizontal size={18} /> Filters
              </button>
            </div>
          </motion.div>
        </div>

        {/* Categories Bar */}
        <div className="mb-16 overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all border ${
                selectedCategory === 'All' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                : 'bg-transparent text-zinc-400 border-blue-900/20 hover:border-blue-500/40'
              }`}
            >
              All Series
            </button>
            {[...CATEGORIES].sort().map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all border ${
                  selectedCategory === cat 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                  : 'bg-transparent text-zinc-400 border-blue-900/20 hover:border-blue-500/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-900/5 border border-blue-500/20 p-8 rounded-2xl mb-16 overflow-hidden backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <label className="block text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Price Range (EGP)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      placeholder="Min"
                      className="w-full bg-black/50 border border-blue-900/20 text-white px-4 py-3 rounded-lg text-sm focus:border-blue-500/50 outline-none transition-all"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <span className="text-blue-900/40">—</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      className="w-full bg-black/50 border border-blue-900/20 text-white px-4 py-3 rounded-lg text-sm focus:border-blue-500/50 outline-none transition-all"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Category</label>
                  <select
                    className="w-full bg-black/50 border border-blue-900/20 text-white px-4 py-3 rounded-lg text-sm focus:border-blue-500/50 outline-none transition-all appearance-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setPriceRange([0, 1000000]);
                    }}
                    className="text-blue-500/60 hover:text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors border-b border-blue-900/20 pb-1"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-2 border-blue-900/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-t-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
            </div>
            <p className="mt-8 text-blue-500/60 text-[11px] font-bold uppercase tracking-[0.3em]">Synchronizing Inventory</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-blue-900/20 rounded-3xl bg-blue-900/5">
            <Search className="mx-auto text-blue-900/20 mb-8" size={64} strokeWidth={1} />
            <h3 className="text-3xl font-medium text-white mb-4 tracking-tight uppercase">No Results Found</h3>
            <p className="text-zinc-400 max-w-xs mx-auto text-base font-normal leading-relaxed">
              We couldn't find any components matching your current selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
