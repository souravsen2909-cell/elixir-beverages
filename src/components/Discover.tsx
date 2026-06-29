import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ArrowRight, CheckCircle, ShieldAlert, Award } from 'lucide-react';

export default function Discover() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<'premium' | 'everyday'>('premium');

  const products = {
    premium: {
      id: 'premium',
      name: 'Premium Alkaline Water',
      image: '/src/assets/images/elixir_premium_anatomy_1782570170282.jpg',
      desc: 'Our premium alkaline water is crafted for those who crave the finest—smooth, refreshing, and packed with balance. Every sip is an experience, whether you’re reaching for the sleek 500 ml or the generous 1-litre bottle. It’s more than just water—it’s a pure moment of indulgence, designed to elevate your day, your health, and your hydration game. Go ahead, choose the premium side of life—you deserve it!',
      pH: '8.8 pH Boosted',
      benefits: [
        { label: 'Improved Cognitive Function', desc: 'Rich anti-oxidant properties help improve overall cognitive function.' },
        { label: 'Neutralizes Acidity', desc: 'Our alkaline water helps neutralize acidity in the human body.' },
        { label: 'Reduced Risk of Chronic Diseases', desc: 'Slows down the progression of chronic diseases.' },
        { label: 'Antioxidant Properties', desc: 'Helps neutralize free radicals potentially reducing oxidative stress.' }
      ]
    },
    everyday: {
      id: 'everyday',
      name: 'Everyday Alkaline Water',
      image: '/src/assets/images/elixir_everyday_anatomy_1782570324944.jpg',
      desc: 'Giving everyday hydration an upgrade! Our everyday alkaline water is all about keeping things crisp, refreshing, and just the right balance. Whether you’re reaching for a 500 ml to power through the day or grabbing a 1-litre bottle to stay refreshed all day long, you’ll notice the difference in every sip. It’s simple, it’s clean, and it’s the water your body’s been craving—hydrate smarter, not harder!',
      pH: '7.8 pH Balanced',
      benefits: [
        { label: 'Improved Bone Health', desc: 'Rich mineral content strengthens overall bone health leading to an efficient existence.' },
        { label: 'Hydration Boost', desc: 'Rich mineral content of calcium & magnesium enhances hydration.' },
        { label: 'Increased Energy', desc: 'Increases energy levels due to improved hydration and mineral intake.' },
        { label: 'Digestive Health', desc: 'Helps reduce symptoms of acid reflux and improves digestion.' }
      ]
    }
  };

  const current = products[selectedProduct];

  return (
    <section id="discover" className="py-24 bg-[#030712] border-b-2 border-cyan-500/20 relative overflow-hidden">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-water-float" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-water-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border-2 border-cyan-500/50 text-white rounded-none font-mono text-[10px] uppercase tracking-widest font-black mb-4 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> Discover Elixir
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tighter uppercase leading-none">
            Pure Indulgence. <br />
            <span className="font-serif font-normal italic text-cyan-400 normal-case mt-1 block">Elevate your daily hydration.</span>
          </h2>
        </div>

        {/* Product Toggle Tabs */}
        <div className="flex border-b-2 border-cyan-500/20 mb-12">
          <button
            onClick={() => setSelectedProduct('premium')}
            className={`px-6 py-4 font-display font-black text-xs sm:text-sm uppercase tracking-wider border-t-2 border-x-2 border-cyan-500/30 -mb-[2px] cursor-pointer transition-all ${
              selectedProduct === 'premium'
                ? 'bg-cyan-500 text-slate-950 font-extrabold border-cyan-500 shadow-[0_-2px_0_0_#06b6d4]'
                : 'bg-slate-900 text-neutral-300 border-cyan-500/20 hover:bg-slate-800'
            }`}
          >
            💎 Premium Alkaline
          </button>
          <button
            onClick={() => setSelectedProduct('everyday')}
            className={`px-6 py-4 font-display font-black text-xs sm:text-sm uppercase tracking-wider border-t-2 border-x-2 border-cyan-500/30 -mb-[2px] ml-2 cursor-pointer transition-all ${
              selectedProduct === 'everyday'
                ? 'bg-cyan-500 text-slate-950 font-extrabold border-cyan-500 shadow-[0_-2px_0_0_#06b6d4]'
                : 'bg-slate-900 text-neutral-300 border-cyan-500/20 hover:bg-slate-800'
            }`}
          >
            🥛 Everyday Alkaline
          </button>
        </div>

        {/* Main Product Feature Section */}
        <div className="max-w-4xl mx-auto">
          {/* Interactive Bottle Anatomy Card - Full Width */}
          <div className="bg-slate-950 border-2 border-cyan-500/40 flex flex-col justify-center items-center shadow-[6px_6px_0px_0px_rgba(6,182,212,0.4)] hover:shadow-[8px_8px_0px_0px_rgba(14,165,233,0.6)] relative overflow-hidden group p-0 transition-all duration-300">
            <span className="absolute top-4 left-4 font-mono text-[8.5px] font-black uppercase tracking-widest text-white bg-slate-900/90 border border-cyan-500/30 px-2 py-0.5 z-10">
              Anatomy Visualizer
            </span>
            <span className="absolute top-4 right-4 font-mono text-[9px] font-black uppercase tracking-wider text-cyan-400 bg-slate-900/90 px-2 py-0.5 border border-cyan-500/30 z-10">
              {current.pH}
            </span>

            <motion.div
              key={selectedProduct}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex items-center justify-center min-h-[500px]"
            >
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
