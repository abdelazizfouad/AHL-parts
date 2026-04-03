import React from 'react';
import { ShieldCheck, Award, Users, MapPin, Phone, Mail, Package } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <section className="py-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6"
          >
            ASHRAF & HESHAMLIBYA. <br />
            <span className="text-zinc-500">MERCEDES PARTS</span>
          </motion.h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Ashraf & Hesham Libya – Mercedes Parts is an Egyptian company specialized in supplying 
            original Mercedes-Benz car parts (both new and high-quality used) for all models.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 tracking-tight text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 border border-zinc-800 rounded-sm">
              <ShieldCheck className="text-white mb-6" size={40} />
              <h3 className="text-xl font-bold text-white mb-4">100% Original Parts</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Engine, gearbox, electrical, lights, bumpers, suspension, and more. 
                Every part is guaranteed original.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 border border-zinc-800 rounded-sm">
              <Package className="text-white mb-6" size={40} />
              <h3 className="text-xl font-bold text-white mb-4">Rare Parts Import</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Specialized in importing rare and hard-to-find parts for modern and classic Mercedes models.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 border border-zinc-800 rounded-sm">
              <Award className="text-white mb-6" size={40} />
              <h3 className="text-xl font-bold text-white mb-4">Quality Guarantee</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We provide a quality guarantee on all available parts, ensuring your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Why Choose Us?</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">1</div>
                  <div>
                    <h4 className="text-white font-bold">Experienced Importers</h4>
                    <p className="text-zinc-500 text-sm">Deep expertise in importing modern Mercedes parts directly from trusted sources.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">2</div>
                  <div>
                    <h4 className="text-white font-bold">Competitive Pricing</h4>
                    <p className="text-zinc-500 text-sm">Better prices compared to official dealers without compromising on quality.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">3</div>
                  <div>
                    <h4 className="text-white font-bold">Wide Coverage</h4>
                    <p className="text-zinc-500 text-sm">Parts for S-Class, E-Class, C-Class, GLE, GLS, and all other Mercedes-Benz models.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-black border border-zinc-800 rounded-sm overflow-hidden grayscale opacity-50">
                <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=500" alt="Mercedes Part" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square bg-black border border-zinc-800 rounded-sm overflow-hidden grayscale opacity-50">
                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=500" alt="Mercedes Car" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Location & Contact</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="text-zinc-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-bold">Address</h4>
                    <p className="text-zinc-500 text-sm">6 Youssef Sabry Abu Talib St, Barkit El Nasr, Cairo, Egypt 🇪🇬</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-zinc-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-bold">Phone</h4>
                    <p className="text-zinc-500 text-sm">+20 112 914 0388</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="text-zinc-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-bold">Working Hours</h4>
                    <p className="text-zinc-500 text-sm">Daily 11:00 – 23:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-96 bg-zinc-900 rounded-sm border border-zinc-800 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-bold text-xl uppercase tracking-widest">
                Map View
              </div>
              <img 
                src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=1000" 
                alt="Workshop" 
                className="w-full h-full object-cover opacity-20 grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
