import { motion } from 'motion/react';
import { Filter, Mountain, Package, Activity, Zap, Shield, Users, CheckCircle2 } from 'lucide-react';

export default function Impact() {
  const features = [
    {
      id: 'triple-filtration',
      title: 'Triple filtration process',
      desc: 'Elixir goes through an advanced triple filtration process to ensure the highest purity, removing impurities and contaminants.',
      icon: Filter,
      accent: 'rgba(6,182,212,1)', // Cyan
    },
    {
      id: 'naturally-sourced',
      title: 'Naturally sourced',
      desc: 'Sourced from pristine springs, elixir retains natural minerals while eliminating harmful substances',
      icon: Mountain,
      accent: 'rgba(16,185,129,1)', // Emerald
    },
    {
      id: 'eco-friendly-packaging',
      title: 'ECO-FRIENDLY PACKAGING',
      desc: 'Our bottles are 100% recyclable, minimizing environmental impact',
      icon: Package,
      accent: 'rgba(244,63,94,1)', // Rose
    },
    {
      id: 'balances-ph',
      title: 'BALANCES PH LEVELS',
      desc: 'Elixir helps neutralize acidity in the body, promoting optimal ph balance.',
      icon: Activity,
      accent: 'rgba(168,85,247,1)', // Purple
    },
    {
      id: 'enhanced-hydration',
      title: 'ENHANCED HYDRATION',
      desc: 'The alkaline nature of elixir allows for better absorption, keeping you hydrated longer',
      icon: Zap,
      accent: 'rgba(234,179,8,1)', // Yellow
    },
    {
      id: 'antioxidant-properties',
      title: 'ANTIOXIDANT PROPERTIES',
      desc: "Rich in antioxidants, elixir supports your body's defense against free radicals.",
      icon: Shield,
      accent: 'rgba(59,130,246,1)', // Blue
    },
    {
      id: 'community-driven',
      title: 'COMMUNITY DRIVEN',
      desc: 'A portion of our profits supports local environmental initiatives and women-led businesses',
      icon: Users,
      accent: 'rgba(236,72,153,1)', // Pink
    },
  ];

  return (
    <section id="impact" className="py-24 bg-[#030712] border-b-2 border-cyan-500/20 relative overflow-hidden">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      {/* Watery ambient glowing orbs */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-water-float" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-water-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl text-left mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border-2 border-cyan-500/50 text-white rounded-none font-mono text-[10px] uppercase tracking-widest font-black mb-4 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> why choose elixir
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            Pure Purity, <br />
            <span className="font-serif font-normal italic text-cyan-400 normal-case mt-1 block">Uncompromised Quality.</span>
          </h2>
          <p className="mt-6 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-medium">
            Choose Elixir because we don’t just hydrate—you elevate your everyday sip with alkaline water that’s pure, crisp, and packed with a pH boost. Plus, with every bottle, you’re making a sustainable choice, supporting a brand that saves and respects every drop, just like you do.
          </p>
        </div>

        {/* Bento / Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            // The 7th element will span 2 columns on large screens to keep a balanced grid layout
            const isLast = idx === features.length - 1;
            
            return (
              <motion.div
                key={feat.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-slate-950 border-2 border-cyan-500/30 p-6 sm:p-8 rounded-none text-left flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(6,182,212,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(14,165,233,0.5)] hover:border-cyan-400 transition-all duration-200 ${
                  isLast ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div>
                  <div 
                    className="p-3 bg-slate-900 text-white border-2 border-cyan-500/40 w-12 h-12 flex items-center justify-center mb-6 rounded-none"
                    style={{ boxShadow: `3px 3px 0px 0px ${feat.accent}` }}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2.5px] text-cyan-400" />
                  </div>
                  <h3 className="font-display font-black text-white text-base uppercase tracking-tight mb-2">
                    {feat.title}
                  </h3>
                  <p className={`text-xs text-neutral-300 font-medium leading-relaxed ${isLast ? 'max-w-2xl' : ''}`}>
                    {feat.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-wider text-neutral-500">
                  <span>verified standard</span>
                  <span className="text-cyan-400">100% active</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Pledge Statement */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="font-serif italic text-lg text-neutral-300 leading-relaxed font-normal">
            "We do not inherit the water source from our ancestors; we borrow it from our future generations."
          </p>
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mt-4 font-bold">
            — Elixir Sustainability Covenant
          </span>
        </div>

      </div>
    </section>
  );
}
