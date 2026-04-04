import React, { useState, useEffect } from 'react';
import { 
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from '../lib/firebase';
import { Product, CATEGORIES } from '../types';
import { Plus, Trash2, Edit2, Loader2, ShieldAlert, LogOut, Package, Image as ImageIcon, Tag, DollarSign, PenTool, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    partNumber: '',
    price: 0,
    image: '',
    compatibility: '',
    category: 'Engine & Drivetrain',
    description: ''
  });

  useEffect(() => {
    const logged = localStorage.getItem('admin_logged') === 'true';
    setIsLoggedIn(logged);

    if (logged) {
      const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_logged', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, image: url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), {
          ...formData,
          price: Number(formData.price)
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          price: Number(formData.price),
          createdAt: new Date()
        });
      }
      setFormData({
        name: '',
        partNumber: '',
        price: 0,
        image: '',
        compatibility: '',
        category: 'Engine & Drivetrain',
        description: ''
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Check console for details.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const startEdit = (product: Product) => {
    setFormData({
      name: product.name,
      partNumber: product.partNumber,
      price: product.price,
      image: product.image,
      compatibility: product.compatibility,
      category: product.category,
      description: product.description || ''
    });
    setEditingId(product.id || null);
    setIsAdding(true);
  };

  const seedSampleData = async () => {
    const samples: Omit<Product, 'id'>[] = [
      {
        name: "AMG Performance Steering Wheel",
        partNumber: "A2054605902",
        price: 35000,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
        compatibility: "C-Class W205, E-Class W213",
        category: "Interior",
        description: "Genuine AMG performance steering wheel with paddle shifters and Nappa leather.",
        createdAt: new Date()
      },
      {
        name: "Mercedes-Benz Brake Disc (Front)",
        partNumber: "A0004211212",
        price: 11500,
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800",
        compatibility: "Various Models (W205, W213)",
        category: "Brakes",
        description: "High-performance front brake disc for optimal stopping power.",
        createdAt: new Date()
      },
      {
        name: "E-Class W213 LED Headlight",
        partNumber: "A2139064104",
        price: 25000,
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
        compatibility: "W213 (2016-2020)",
        category: "Electrical & Lighting",
        description: "Genuine high-performance LED headlight for Mercedes-Benz E-Class.",
        createdAt: new Date()
      },
      {
        name: "AMG Performance Brake Pads",
        partNumber: "A0004206000",
        price: 8500,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800",
        compatibility: "C63, E63, S63 AMG Models",
        category: "Brakes",
        description: "Original AMG brake pads for superior stopping power.",
        createdAt: new Date()
      },
      {
        name: "Mercedes-Benz M274 Oil Filter",
        partNumber: "A2701800109",
        price: 950,
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
        compatibility: "M270, M274 Engines",
        category: "Oil & Fluids",
        description: "Genuine oil filter for optimal engine protection.",
        createdAt: new Date()
      },
      {
        name: "Mercedes-Benz Fuel Injector",
        partNumber: "A2780700687",
        price: 15800,
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
        compatibility: "M278, M157 V8 Engines",
        category: "Engine & Drivetrain",
        description: "Precision fuel injector for direct injection Mercedes engines.",
        createdAt: new Date()
      },
      {
        name: "S-Class W222 Air Suspension Strut",
        partNumber: "A2223204813",
        price: 42000,
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
        compatibility: "S-Class W222 (2013-2020)",
        category: "Suspension",
        description: "Genuine Airmatic suspension strut for ultimate comfort.",
        createdAt: new Date()
      },
      {
        name: "Mercedes-Benz Star Emblem (Illuminated)",
        partNumber: "A1668170316",
        price: 5500,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
        compatibility: "Various Models (GLE, GLS, C, E)",
        category: "Exterior",
        description: "Illuminated front grille star emblem for a modern look.",
        createdAt: new Date()
      }
    ];

    if (window.confirm('Add genuine Mercedes parts to the collection?')) {
      setLoading(true);
      try {
        const productsCol = collection(db, 'products');
        for (const sample of samples) {
          await addDoc(productsCol, sample);
        }
        alert('Collection seeded successfully.');
      } catch (error: any) {
        console.error("Error seeding data:", error);
        alert(`Error seeding data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/10 border border-white/5 p-12 w-full max-w-md backdrop-blur-sm"
        >
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 border border-white/5 rounded-full flex items-center justify-center relative">
              <ShieldAlert className="text-zinc-700" size={32} strokeWidth={1} />
              <div className="absolute inset-0 border border-white/10 rounded-full animate-pulse opacity-20" />
            </div>
          </div>
          <h1 className="text-3xl font-light text-white text-center mb-4 tracking-tighter">Portal Access</h1>
          <p className="text-zinc-600 text-center text-[10px] font-bold uppercase tracking-[0.3em] mb-12">Authorized Personnel Only</p>
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Security Key</label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-white/10 text-white px-0 py-4 focus:outline-none focus:border-white transition-all font-light tracking-widest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="group relative w-full bg-white text-black py-5 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em]">Authenticate</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-8">
          <div>
            <h1 className="text-6xl font-light text-white tracking-tighter mb-4">Inventory</h1>
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">Precision Management System</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={seedSampleData}
              className="text-zinc-600 hover:text-white transition-all text-[9px] font-bold uppercase tracking-[0.3em] border border-white/5 px-8 py-4 hover:border-white/20"
            >
              Seed Collection
            </button>
            <button 
              onClick={() => {
                setIsAdding(!isAdding);
                if (isAdding) setEditingId(null);
              }}
              className="bg-white text-black px-8 py-4 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all flex items-center gap-3"
            >
              {isAdding ? 'Cancel' : <><Plus size={14} /> New Entry</>}
            </button>
            <button 
              onClick={handleLogout}
              className="text-zinc-800 hover:text-red-500 transition-all p-4"
            >
              <LogOut size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-zinc-900/10 border border-white/5 p-12 mb-20 overflow-hidden"
            >
              <h2 className="text-2xl font-light text-white mb-12 tracking-tight">
                {editingId ? 'Edit Component' : 'New Component Entry'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Component Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 text-white px-0 py-4 focus:outline-none focus:border-white transition-all font-light"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Part Number</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 text-white px-0 py-4 focus:outline-none focus:border-white transition-all font-light tracking-widest"
                      value={formData.partNumber}
                      onChange={(e) => setFormData({...formData, partNumber: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Value (EGP)</label>
                      <input
                        required
                        type="number"
                        className="w-full bg-transparent border-b border-white/10 text-white px-0 py-4 focus:outline-none focus:border-white transition-all font-light"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Category</label>
                      <select
                        className="w-full bg-transparent border-b border-white/10 text-white px-0 py-4 focus:outline-none focus:border-white transition-all font-light appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat} className="bg-black">{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Visual Asset (URL or Upload)</label>
                    <div className="flex gap-4 mb-4">
                      <input
                        type="url"
                        className="flex-grow bg-transparent border-b border-white/10 text-white px-0 py-4 focus:outline-none focus:border-white transition-all font-light text-sm"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="https://..."
                      />
                      <label className="text-zinc-600 hover:text-white transition-colors cursor-pointer p-4">
                        {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} strokeWidth={1.5} />}
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Compatibility Matrix</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 text-white px-0 py-4 focus:outline-none focus:border-white transition-all font-light"
                      value={formData.compatibility}
                      onChange={(e) => setFormData({...formData, compatibility: e.target.value})}
                      placeholder="e.g. W205, W213, W222"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Engineering Specifications</label>
                    <textarea
                      className="w-full bg-transparent border border-white/10 text-white p-6 focus:outline-none focus:border-white transition-all font-light h-32 resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit"
                    className="group relative w-full bg-white text-black py-6 overflow-hidden transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em]">
                      {editingId ? 'Update Component' : 'Register Component'}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-8" />
            <p className="text-zinc-700 text-[9px] font-bold uppercase tracking-[0.5em]">Synchronizing Inventory</p>
          </div>
        ) : (
          <div className="bg-zinc-900/10 border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-black/50 border-b border-white/5">
                <tr>
                  <th className="px-10 py-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Component</th>
                  <th className="px-10 py-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Part #</th>
                  <th className="px-10 py-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Category</th>
                  <th className="px-10 py-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Value</th>
                  <th className="px-10 py-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-900/20 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-black border border-white/5 overflow-hidden flex-shrink-0 relative">
                          <img 
                            src={product.image || 'https://picsum.photos/seed/part/200/200'} 
                            alt="" 
                            className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-white font-light text-lg tracking-tight">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-zinc-600 text-xs font-light tracking-widest">{product.partNumber}</td>
                    <td className="px-10 py-8">
                      <span className="text-[8px] font-bold text-zinc-700 border border-zinc-800 px-3 py-1.5 rounded-full uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-white font-light text-lg tracking-tighter">
                      {product.price.toLocaleString()} <span className="text-[9px] text-zinc-700 ml-1 uppercase">EGP</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-4">
                        <button 
                          onClick={() => startEdit(product)}
                          className="text-zinc-800 hover:text-white transition-colors p-2"
                        >
                          <Edit2 size={16} strokeWidth={1.5} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id!)}
                          className="text-zinc-800 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
