import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, ArrowRight, Package, Car, Phone, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { decodeVIN, VINInfo } from '../services/geminiService';

export default function Home() {
  const [vin, setVin] = useState('');
  const [vinInfo, setVinInfo] = useState<VINInfo | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const navigate = useNavigate();

  const handleVinSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vin) return;

    if (vin.length === 17) {
      setIsDecoding(true);
      const info = await decodeVIN(vin);
      setVinInfo(info);
      setIsDecoding(false);
      if (!info) {
        navigate(`/catalog?search=${vin}`);
      }
    } else {
      navigate(`/catalog?search=${vin}`);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1920" 
            alt="Mercedes Engine" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
              ASHRAF & <br />
              <span className="text-zinc-500 uppercase">Hesham Libya. eg</span>
            </h1>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              Genuine Mercedes-Benz spare parts for those who demand nothing but perfection. 
              Serving the Egyptian automotive market with integrity and expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalog" 
                className="bg-white text-black px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                Explore Catalog <ArrowRight size={16} />
              </Link>
              <Link 
                to="/about" 
                className="border border-zinc-700 text-white px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 p-8 md:p-12 rounded-sm border border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">AI-Powered Search</h2>
                <p className="text-zinc-400 mb-6">
                  Enter your VIN or Part Number to find exactly what you need. 
                  Our system decodes your vehicle specifications instantly.
                </p>
                <form onSubmit={handleVinSearch} className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Enter 17-digit VIN or Part Number (e.g. A213...)"
                    className="w-full bg-black border border-zinc-700 text-white px-6 py-4 rounded-sm focus:outline-none focus:border-white transition-colors"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                  />
                  <button 
                    type="submit"
                    disabled={isDecoding}
                    className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-sm hover:bg-zinc-200 transition-colors disabled:bg-zinc-500"
                  >
                    {isDecoding ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                  </button>
                </form>

                <AnimatePresence>
                  {vinInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-black border border-zinc-700 p-6 rounded-sm mb-6"
                    >
                      {vinInfo.partInfo ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-white font-bold">
                            <Package size={18} className="text-zinc-500" />
                            Part Identified: {vinInfo.partInfo.name}
                          </div>
                          <p className="text-zinc-400 text-sm">{vinInfo.partInfo.description}</p>
                          <div className="bg-zinc-900 p-3 rounded-sm">
                            <span className="text-zinc-500 text-xs block uppercase tracking-widest mb-1">Estimated Price</span>
                            <span className="text-white font-bold">{vinInfo.partInfo.estimatedPriceRange}</span>
                          </div>
                          <button 
                            onClick={() => navigate(`/catalog?search=${vin}`)}
                            className="w-full bg-white text-black py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                          >
                            Search in Catalog
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-white font-bold mb-4">
                            <Info size={18} className="text-zinc-500" />
                            Vehicle Identified: {vinInfo.year} {vinInfo.model}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                            <div>
                              <span className="text-zinc-500 block">Engine</span>
                              <span className="text-white">{vinInfo.engine}</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">Transmission</span>
                              <span className="text-white">{vinInfo.transmission}</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">Trim</span>
                              <span className="text-white">{vinInfo.trim}</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block">Body Style</span>
                              <span className="text-white">{vinInfo.bodyStyle}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => navigate(`/catalog?search=${vinInfo.model}`)}
                            className="w-full bg-zinc-800 text-white py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                          >
                            Find Parts for this {vinInfo.model}
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black p-6 border border-zinc-800 rounded-sm">
                  <Car className="text-white mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">VIN Decoding</h3>
                  <p className="text-xs text-zinc-500">Automatic compatibility check for your specific model.</p>
                </div>
                <div className="bg-black p-6 border border-zinc-800 rounded-sm">
                  <Package className="text-white mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">Part Lookup</h3>
                  <p className="text-xs text-zinc-500">Search by OEM or manufacturer part numbers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Genuine Quality</h3>
              <p className="text-zinc-400 text-sm">We only source parts that meet the rigorous standards of Mercedes-Benz.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Direct Support</h3>
              <p className="text-zinc-400 text-sm">Our experts are available via WhatsApp to help you find the right part.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Fast Delivery</h3>
              <p className="text-zinc-400 text-sm">Reliable shipping across Cairo, Alexandria, and all of Egypt.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
