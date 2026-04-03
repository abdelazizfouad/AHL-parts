import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, getDocs, db } from '../lib/firebase';
import { Product, CATEGORIES } from '../types';
import { Search, Filter, ShoppingCart, Loader2, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
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
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.compatibility.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="py-12 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* A-Z Quick Browse */}
        <div className="mb-16 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                selectedCategory === 'All' 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              All Parts
            </button>
            {[...CATEGORIES].sort().map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                  selectedCategory === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Product Catalog</h1>
            <p className="text-zinc-500 text-sm">Browse our extensive inventory of Mercedes-Benz parts.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder="Search name, part #, VIN..."
                className="bg-zinc-900 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-sm focus:outline-none focus:border-zinc-600 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-sm text-sm font-bold uppercase tracking-widest transition-all ${
                showFilters ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm mb-12 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">Price Range (EGP)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      placeholder="Min"
                      className="w-full bg-black border border-zinc-800 text-white px-3 py-2 rounded-sm text-sm"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <span className="text-zinc-700">-</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      className="w-full bg-black border border-zinc-800 text-white px-3 py-2 rounded-sm text-sm"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">Category</label>
                  <select
                    className="w-full bg-black border border-zinc-800 text-white px-3 py-2 rounded-sm text-sm"
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
                      setPriceRange([0, 10000]);
                    }}
                    className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="text-white animate-spin mb-4" size={48} />
            <p className="text-zinc-500 font-medium">Loading inventory...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-all"
              >
                <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative bg-black">
                  <img
                    src={product.image || 'https://picsum.photos/seed/part/400/400'}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    {product.category}
                  </div>
                </Link>
                <div className="p-5">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">
                    {product.partNumber}
                  </div>
                  <Link to={`/product/${product.id}`} className="block text-white font-bold text-lg mb-2 hover:text-zinc-300 transition-colors truncate">
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">{product.price.toLocaleString()} <span className="text-xs text-zinc-500 font-bold">ج.م</span></span>
                    <Link 
                      to={`/product/${product.id}`}
                      className="p-2 bg-white text-black rounded-sm hover:bg-zinc-200 transition-colors"
                      title="View Details"
                    >
                      <ShoppingCart size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-sm">
            <Search className="mx-auto text-zinc-700 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No parts found</h3>
            <p className="text-zinc-500">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
