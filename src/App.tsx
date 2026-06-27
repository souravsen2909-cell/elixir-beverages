import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Discover from './components/Discover';
import Calculator from './components/Calculator';
import Impact from './components/Impact';
import Certifications from './components/Certifications';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CartItem } from './types';
import { Droplet, Sparkles, Shield, Heart } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Persistence for cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('elixir_beverages_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('elixir_beverages_cart', JSON.stringify(cart));
  }, [cart]);

  // Section scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['discover', 'calculator', 'impact', 'certifications'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === newItem.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#030712] font-sans antialiased text-white flex flex-col justify-between">
      
      {/* 0. Entry/Splash Animation Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center select-none overflow-hidden"
          >
            <div className="text-center space-y-4 px-4">
              <div className="space-y-1">
                <motion.div
                  initial={{ letterSpacing: "0.15em", opacity: 0, y: 20 }}
                  animate={{ letterSpacing: "0.35em", opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-widest leading-none"
                >
                  ELIXIR
                </motion.div>
                <motion.div
                  initial={{ letterSpacing: "0.3em", opacity: 0, y: 15 }}
                  animate={{ letterSpacing: "0.55em", opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
                  className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase font-black tracking-widest"
                >
                  BEVERAGES
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="w-16 h-[2px] bg-emerald-500 mx-auto origin-center"
              />

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
              >
                <a
                  href="https://sip-style.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] sm:text-[10px] text-emerald-400 hover:text-emerald-300 uppercase tracking-widest font-black transition-colors hover:underline"
                >
                  powered by sip style
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Navigation */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
      />

      {/* 2. Main Page Layout */}
      <main className="flex-grow">
        
        {/* Hero Segment */}
        <Hero />

        {/* Branding Callout Banner */}
        <section className="bg-[#020617] text-white py-12 px-4 sm:px-6 lg:px-8 border-y-2 border-cyan-500/25 relative overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.1)]">
          {/* Subtle background flow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-left max-w-xl">
              <h3 className="font-display font-black text-lg sm:text-xl text-cyan-400 tracking-tighter uppercase">
                Purity Refined. Environment Maintained.
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans leading-relaxed font-medium">
                By opting for infinitely reusable borosilicate prism vessels and volcanic basalt alloy steel, Elixir buyers bypass single-use plastics altogether.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-900 text-cyan-400 border-2 border-cyan-400 rounded-none shadow-[2px_2px_0px_0px_rgba(6,182,212,0.5)]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-500 block font-black uppercase">QUALITY</span>
                  <span className="text-xs font-black text-white tracking-tight uppercase">99.9% Raw Purity</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-900 text-cyan-400 border-2 border-cyan-400 rounded-none shadow-[2px_2px_0px_0px_rgba(6,182,212,0.5)]">
                  <Droplet className="w-4 h-4 fill-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-500 block font-black uppercase">SOURCE</span>
                  <span className="text-xs font-black text-white tracking-tight uppercase">Volcanic Aquifer</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-900 text-emerald-400 border-2 border-emerald-400 rounded-none shadow-[2px_2px_0px_0px_rgba(16,185,129,0.5)]">
                  <Heart className="w-4 h-4 fill-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-500 block font-black uppercase">IMPACT</span>
                  <span className="text-xs font-black text-white tracking-tight uppercase">Carbon Negative</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discover showcase */}
        <Discover />

        {/* Hydration calculator */}
        <Calculator />

        {/* Sustainability Carbon calculator */}
        <Impact />

        {/* Official certifications and quality marks */}
        <Certifications />

      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Cart Slide Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
