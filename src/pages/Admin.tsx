import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  db,
  onSnapshot
} from '../lib/firebase';
import { Product, CATEGORIES } from '../types';
import { Plus, Trash2, Edit2, Loader2, ShieldAlert, LogOut, Package, Image as ImageIcon, Tag, DollarSign, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
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
        name: "Mercedes E-Class W213 LED Headlight",
        partNumber: "A2139064104",
        price: 4500,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
        compatibility: "W213 (2016-2020)",
        category: "Electrical & Lighting",
        description: "Genuine high-performance LED headlight for Mercedes-Benz E-Class.",
        createdAt: new Date()
      },
      {
        name: "AMG Performance Brake Pads Set",
        partNumber: "A0004206000",
        price: 1200,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800",
        compatibility: "C63, E63, S63 AMG Models",
        category: "Brakes",
        description: "Original AMG brake pads for superior stopping power and durability.",
        createdAt: new Date()
      },
      {
        name: "Mercedes-Benz M274 Oil Filter",
        partNumber: "A2701800109",
        price: 150,
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
        compatibility: "M270, M274 Engines",
        category: "Oil & Fluids",
        description: "Genuine oil filter for optimal engine protection and performance.",
        createdAt: new Date()
      }
    ];

    if (window.confirm('Add 3 sample Mercedes parts to the catalog?')) {
      try {
        for (const sample of samples) {
          await addDoc(collection(db, 'products'), sample);
        }
        alert('Sample data added successfully!');
      } catch (error) {
        console.error("Error seeding data:", error);
        alert('Error seeding data. Check console.');
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
              <ShieldAlert className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-zinc-500 text-center text-sm mb-8">Access restricted to authorized personnel.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-white transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-white text-black py-3 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Inventory Management</h1>
            <p className="text-zinc-500 text-sm">Add, update, or remove parts from the catalog.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={seedSampleData}
              className="border border-zinc-800 text-zinc-400 px-6 py-2 rounded-sm font-bold text-sm uppercase tracking-widest hover:text-white hover:border-zinc-600 transition-all"
            >
              Seed Data
            </button>
            <button 
              onClick={() => {
                setIsAdding(!isAdding);
                if (isAdding) setEditingId(null);
              }}
              className="bg-white text-black px-6 py-2 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2"
            >
              {isAdding ? 'Cancel' : <><Plus size={18} /> Add Product</>}
            </button>
            <button 
              onClick={handleLogout}
              className="border border-zinc-800 text-zinc-500 px-6 py-2 rounded-sm font-bold text-sm uppercase tracking-widest hover:text-white hover:border-zinc-600 transition-all flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm mb-12 overflow-hidden"
            >
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Part Name</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 text-zinc-600" size={18} />
                      <input
                        required
                        type="text"
                        className="w-full bg-black border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-white"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Part Number</label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-3 text-zinc-600" size={18} />
                      <input
                        required
                        type="text"
                        className="w-full bg-black border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-white"
                        value={formData.partNumber}
                        onChange={(e) => setFormData({...formData, partNumber: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Price (LYD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 text-zinc-600" size={18} />
                        <input
                          required
                          type="number"
                          className="w-full bg-black border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-white"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Category</label>
                      <select
                        className="w-full bg-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-white h-[50px]"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-3 text-zinc-600" size={18} />
                      <input
                        type="url"
                        className="w-full bg-black border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-white"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Compatibility</label>
                    <div className="relative">
                      <PenTool className="absolute left-3 top-3 text-zinc-600" size={18} />
                      <input
                        type="text"
                        className="w-full bg-black border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-white"
                        value={formData.compatibility}
                        onChange={(e) => setFormData({...formData, compatibility: e.target.value})}
                        placeholder="e.g. W204, W212, W221"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Description</label>
                    <textarea
                      className="w-full bg-black border border-zinc-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-white h-[100px] resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                  >
                    {editingId ? 'Update Product' : 'Save Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="text-white animate-spin mb-4" size={48} />
            <p className="text-zinc-500 font-medium">Loading inventory...</p>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-black border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Part #</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-sm overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image || 'https://picsum.photos/seed/part/100/100'} 
                            alt="" 
                            className="w-full h-full object-cover opacity-80"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-white font-bold text-sm">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">{product.partNumber}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-zinc-500 border border-zinc-700 px-2 py-1 rounded-full uppercase">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-bold">{product.price} LYD</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => startEdit(product)}
                          className="p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id!)}
                          className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
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
