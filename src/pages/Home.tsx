import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, ArrowRight, Package, Car, Phone, Loader2, Info, X, Cpu, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { decodeVIN, VINInfo } from '../services/geminiService';
import { db, collection, query, where, getDocs } from '../lib/firebase';

export default function Home() {
  const [vin, setVin] = useState('');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [vinInfo, setVinInfo] = useState<VINInfo | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [vinError, setVinError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCatalogSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogSearch) return;
    navigate(`/catalog?search=${catalogSearch}`);
  };

  const handleVinSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vin || vin.length < 3) return;

    setIsDecoding(true);
    setVinInfo(null);
    setVinError(null);
    try {
      const info = await decodeVIN(vin);
      if (info) {
        if (info.isPartNumber) {
          setVinError("This appears to be a part number. Please use the Catalog Search above for parts.");
        } else {
          setVinInfo(info);
        }
      } else {
        setVinError("Unable to decode this VIN. Please check the number and try again.");
      }
    } catch (error) {
      console.error("Search error:", error);
      setVinError("A technical error occurred during decoding. Please try again.");
    } finally {
      setIsDecoding(false);
    }
  };

  return (
    <div className="relative bg-[#050505] min-h-screen selection:bg-white selection:text-black">
      {/* Background Grid - Technical Feel */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Hero Section - Technical Precision */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1920" 
            alt="Mercedes Engineering" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
          <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 mb-10 px-4 py-2 border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.5em]">Engineering Excellence</span>
              </div>
              
              <h1 className="text-7xl md:text-[100px] font-medium tracking-tighter text-white mb-10 leading-[0.9] uppercase">
                ASHRAF & <br />
                <span className="text-blue-600">HESHAM</span>
              </h1>
              
              <p className="text-xl text-zinc-300 mb-16 leading-relaxed font-normal max-w-lg">
                The definitive technical repository for genuine Mercedes-Benz components. 
                Sourcing precision-engineered parts for the Egyptian and Libyan markets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <Link 
                  to="/catalog" 
                  className="group relative bg-blue-600 text-white px-14 py-6 overflow-hidden transition-all duration-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                  <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] flex items-center gap-4">
                    Access Inventory <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </Link>
                <Link 
                  to="/about" 
                  className="group border border-blue-500/30 text-zinc-300 px-14 py-6 hover:border-blue-500 hover:text-white transition-all duration-700"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Our Heritage</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full opacity-20" />
              <img 
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200" 
                alt="Mercedes Detail" 
                className="relative z-10 w-full h-auto grayscale opacity-60 border border-blue-900/20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 z-20 bg-black/90 backdrop-blur-xl border border-blue-500/20 p-8">
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-bold text-blue-500 tracking-tighter">2026</div>
                  <div className="h-12 w-[1px] bg-blue-500/20" />
                  <div className="text-[10px] text-zinc-300 font-bold uppercase tracking-[0.3em] leading-relaxed">
                    Technical <br /> Standards
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Sections */}
      <section className="py-40 bg-black relative border-t border-blue-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Catalog Search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/10 border border-blue-900/20 p-12 relative group hover:border-blue-500/30 transition-all"
            >
              <div className="mb-10">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-6">
                  <Package className="text-blue-500" size={24} />
                </div>
                <h3 className="text-3xl font-medium text-white mb-4 tracking-tight uppercase">Product Catalog</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                  Search our entire inventory of genuine Mercedes-Benz parts. 
                  Find specific components by name or part number.
                </p>
              </div>

              <form onSubmit={handleCatalogSearch} className="relative">
                <label className="block text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Site Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ENTER PART NAME OR NUMBER"
                    className="w-full bg-zinc-900/50 border border-blue-900/20 text-white px-6 py-5 focus:outline-none focus:border-blue-500 transition-all text-lg font-medium tracking-widest placeholder:text-zinc-700"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    <Search size={22} strokeWidth={2} />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* VIN/AI Search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-blue-900/5 border border-blue-500/20 p-12 relative group hover:border-blue-500/40 transition-all"
            >
              <div className="mb-10">
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
                  <Cpu className="text-blue-400" size={24} />
                </div>
                <h3 className="text-3xl font-medium text-white mb-4 tracking-tight uppercase">AI VIN Decoder</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                  Decode your vehicle's VIN for full technical specifications. 
                  Our AI identifies exact model, engine, and maintenance requirements.
                </p>
              </div>

              <form onSubmit={handleVinSearch} className="relative">
                <label className="block text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">VIN Diagnostic</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ENTER 17-DIGIT VIN"
                    className="w-full bg-blue-950/30 border border-blue-500/20 text-white px-6 py-5 focus:outline-none focus:border-blue-400 transition-all text-lg font-medium tracking-widest placeholder:text-blue-900/40"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                  />
                  <button 
                    type="submit"
                    disabled={isDecoding}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors disabled:text-zinc-800"
                  >
                    {isDecoding ? <Loader2 className="animate-spin" size={22} strokeWidth={2} /> : <Activity size={22} strokeWidth={2} />}
                  </button>
                </div>
              </form>

              {/* VIN Error Message */}
              <AnimatePresence>
                {vinError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-3"
                  >
                    <Info size={16} /> {vinError}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* VIN Results Area */}
          <AnimatePresence mode="wait">
            {vinInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-16 bg-zinc-900/20 border border-blue-500/20 p-12 backdrop-blur-md"
              >
                <div className="flex justify-between items-baseline border-b border-blue-500/20 pb-8 mb-12">
                  <div>
                    <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.3em] mb-3 block">Vehicle Profile Identified</span>
                    <h3 className="text-5xl font-medium text-white tracking-tighter">{vinInfo.year} {vinInfo.model}</h3>
                  </div>
                  <button onClick={() => setVinInfo(null)} className="text-zinc-500 hover:text-white transition-colors">
                    <X size={24} strokeWidth={2} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                  {[
                    { label: 'Engine Configuration', value: vinInfo.engine },
                    { label: 'Transmission System', value: vinInfo.transmission },
                    { label: 'Trim Level', value: vinInfo.trim },
                    { label: 'Body Architecture', value: vinInfo.bodyStyle }
                  ].map(item => (
                    <div key={item.label}>
                      <span className="text-[9px] text-blue-500/60 uppercase tracking-widest block mb-3 font-bold">{item.label}</span>
                      <span className="text-lg text-white font-medium tracking-wide">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-600/5 p-10 border border-blue-500/20 mb-12">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block mb-8">Recommended Maintenance Components</span>
                  <div className="flex flex-wrap gap-4">
                    {vinInfo.recommendedParts.map(part => (
                      <span key={part} className="text-[11px] font-bold text-blue-400 border border-blue-500/30 px-6 py-3 hover:border-blue-500/60 transition-colors cursor-default bg-blue-900/10">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/catalog?search=${vinInfo.model}`)}
                  className="w-full bg-blue-600 text-white py-6 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-blue-500 transition-all duration-700 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                >
                  Explore Compatible Inventory
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Technical Heritage */}
      <section className="py-40 bg-black border-t border-blue-900/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              { title: 'Technical Integrity', desc: 'Every component undergoes rigorous technical verification to ensure absolute OEM compliance.' },
              { title: 'Precision Sourcing', desc: 'Direct logistical pipelines from Germany to Cairo and Tripoli, ensuring rapid availability.' },
              { title: 'Expert Consultation', desc: 'Direct access to master technicians for complex component identification and compatibility matrix.' }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-[60px] font-medium text-blue-900/20 mb-8 group-hover:text-blue-500/40 transition-colors leading-none">0{i+1}</div>
                <h3 className="text-2xl font-medium text-white mb-6 tracking-tight uppercase">{item.title}</h3>
                <p className="text-zinc-400 text-base leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
