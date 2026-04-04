import React from 'react';
import { ShieldCheck, Award, Users, MapPin, Phone, Mail, Package } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="py-40 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2000" 
            alt="Mercedes Background" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.5em] mb-8 block">The Heritage of Excellence</span>
            <h1 className="text-6xl md:text-8xl font-light text-white tracking-tighter mb-12 leading-none">
              ASHRAF & HESHAM <br />
              <span className="text-zinc-700 italic">PRECISION PARTS</span>
            </h1>
            <p className="text-zinc-400 max-w-3xl mx-auto text-xl font-light leading-relaxed tracking-tight">
              Specialized in the curation and supply of genuine Mercedes-Benz components. 
              We bridge the gap between engineering perfection and your driving experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-4 block">Our Expertise</span>
              <h2 className="text-5xl font-light text-white tracking-tighter">Uncompromising Quality</h2>
            </div>
            <div className="h-[1px] flex-grow mx-12 bg-white/5 hidden md:block mb-4" />
            <p className="text-zinc-500 text-sm max-w-xs font-light uppercase tracking-widest leading-loose">
              Every component is verified for authenticity and performance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="group bg-zinc-900/10 p-16 border border-white/5 hover:bg-zinc-900/20 transition-all duration-700">
              <ShieldCheck className="text-zinc-700 mb-12 group-hover:text-white transition-colors duration-700" size={48} strokeWidth={1} />
              <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Genuine Inventory</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                Direct access to original Mercedes-Benz parts, ensuring your vehicle maintains its factory-engineered integrity.
              </p>
            </div>
            <div className="group bg-zinc-900/10 p-16 border border-white/5 hover:bg-zinc-900/20 transition-all duration-700">
              <Package className="text-zinc-700 mb-12 group-hover:text-white transition-colors duration-700" size={48} strokeWidth={1} />
              <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Global Sourcing</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                Specialized logistics for rare and high-performance components, sourced globally for modern and classic models.
              </p>
            </div>
            <div className="group bg-zinc-900/10 p-16 border border-white/5 hover:bg-zinc-900/20 transition-all duration-700">
              <Award className="text-zinc-700 mb-12 group-hover:text-white transition-colors duration-700" size={48} strokeWidth={1} />
              <h3 className="text-2xl font-light text-white mb-6 tracking-tight">Technical Support</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                Expert consultation to ensure precise compatibility and optimal performance for every installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-40 bg-zinc-900/10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-4 block">The Distinction</span>
                <h2 className="text-5xl font-light text-white tracking-tighter">Why Professionals Choose Us</h2>
              </div>
              
              <div className="space-y-12">
                <div className="flex gap-8">
                  <span className="text-zinc-800 text-4xl font-light">01</span>
                  <div>
                    <h4 className="text-white font-light text-xl mb-3 tracking-tight">Engineering Expertise</h4>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">Decades of specialized knowledge in Mercedes-Benz automotive systems and component life cycles.</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <span className="text-zinc-800 text-4xl font-light">02</span>
                  <div>
                    <h4 className="text-white font-light text-xl mb-3 tracking-tight">Elite Logistics</h4>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">Priority handling and secure shipping for high-value components across Egypt and Libya.</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <span className="text-zinc-800 text-4xl font-light">03</span>
                  <div>
                    <h4 className="text-white font-light text-xl mb-3 tracking-tight">Curated Selection</h4>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed">From AMG performance upgrades to essential maintenance parts, our inventory is meticulously selected.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 border border-white/5 -m-4 z-0" />
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000" 
                alt="Mercedes Detail" 
                className="w-full h-full object-cover grayscale opacity-40 relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <h2 className="text-5xl font-light text-white tracking-tighter">Connect with Us</h2>
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <MapPin className="text-zinc-700 group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                  <div>
                    <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Headquarters</h4>
                    <p className="text-white font-light text-lg tracking-tight">6 Youssef Sabry Abu Talib St, Barkit El Nasr, Cairo, Egypt</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <Phone className="text-zinc-700 group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                  <div>
                    <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Direct Line</h4>
                    <p className="text-white font-light text-lg tracking-tight">+20 112 914 0388</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <Users className="text-zinc-700 group-hover:text-white transition-colors" size={24} strokeWidth={1} />
                  <div>
                    <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Service Hours</h4>
                    <p className="text-white font-light text-lg tracking-tight">Daily 11:00 – 23:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] bg-zinc-900/10 border border-white/5 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=1000" 
                alt="Workshop" 
                className="w-full h-full object-cover opacity-10 grayscale group-hover:opacity-20 transition-opacity duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zinc-800 text-[10px] font-bold uppercase tracking-[1em] -mr-[1em]">Location Map</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
