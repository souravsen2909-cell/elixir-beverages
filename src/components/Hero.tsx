import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf, MessageSquare } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-water-gradient py-20 lg:py-28 border-b-2 border-black">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      {/* Watery ambient glowing orbs */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none animate-water-float" />
      <div className="absolute bottom-12 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none animate-water-float-delayed" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-teal-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border-2 border-cyan-500/50 rounded-none w-fit mb-6 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)] text-white"
            >
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-black flex items-center gap-1 text-white">
                <Sparkles className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                Next Generation Hydration Ritual
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tighter text-white uppercase leading-none"
            >
              Pristine Luxury <br />
              <span className="font-serif font-normal italic text-cyan-400 block my-2 lowercase normal-case">
                pure hydration
              </span>
              On Earth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-neutral-300 font-sans max-w-xl leading-relaxed font-medium"
            >
              Welcome to Elixir Beverages, where every drop is crafted for you to drink the difference. Our premium alkaline water is more than just hydration—it’s Purely Yours, elevating your sip with a refreshing twist. Whether you’re grabbing a sleek 500 ml or stocking up with a 1-litre bottle, expect water that tastes as crisp as it looks. Dive in, because when it comes to quality hydration, we’re making waves!
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="https://wa.me/916297480798?text=Hello%20Elixir%20Beverages!%20I%20would%20like%20to%20order%20some%20premium%20alkaline%20water."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-display text-sm font-black rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(16,185,129,0.5)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(16,185,129,0.7)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(16,185,129,0.3)] tracking-wide uppercase transition-all"
              >
                <MessageSquare className="w-4 h-4 text-white fill-white" />
                Order Now
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white font-display text-sm font-black rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(6,182,212,0.5)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(6,182,212,0.7)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(6,182,212,0.3)] tracking-wide uppercase transition-all"
              >
                Intake Calculator
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
              <a
                href="#impact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a122c] border-2 border-cyan-500/50 text-cyan-300 font-display text-sm font-black rounded-none shadow-[4px_4px_0px_0px_rgba(6,182,212,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(6,182,212,0.5)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(6,182,212,0.2)] tracking-wide uppercase transition-all"
              >
                Why Choose Elixir
              </a>
            </motion.div>

            {/* Trust Markers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 pt-8 border-t-2 border-cyan-500/20 grid grid-cols-3 gap-4"
            >
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-400 uppercase font-black tracking-widest mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> pH Balance
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-tighter">7.8 – 8.5</span>
                <span className="text-[11px] text-neutral-400 font-bold mt-0.5 uppercase">Naturally Alkaline</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-400 uppercase font-black tracking-widest mb-1 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Carbon
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-tighter">Net Zero</span>
                <span className="text-[11px] text-neutral-400 font-bold mt-0.5 uppercase">Infinitely Recyclable</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-neutral-400 uppercase font-black tracking-widest mb-1 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400" /> Purity
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-tighter">100% Raw</span>
                <span className="text-[11px] text-neutral-400 font-bold mt-0.5 uppercase">Zero Microplastics</span>
              </div>
            </motion.div>
          </div>

          {/* Banner Graphic Showcase */}
          <div className="lg:col-span-5 relative flex flex-col gap-3">
            {/* Overlay Badge - Moved above the image container so the bottle is fully visible! */}
            <div className="self-start px-3 py-1.5 bg-slate-900 border-2 border-cyan-500/40 rounded-none flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.3)]">
              <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="font-mono text-[9px] text-white font-black uppercase tracking-widest">
                Featured: Elixir Original
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative rounded-none overflow-hidden shadow-[6px_6px_0px_0px_rgba(6,182,212,1)] hover:shadow-[8px_8px_0px_0px_rgba(14,165,233,1)] border-2 border-black bg-white transition-all duration-300 w-full"
            >
              {/* Main Image */}
              <div className="aspect-[4/5] sm:aspect-[16/13] lg:aspect-[4/5] relative bg-white flex items-center justify-center">
                <img
                  src="/src/assets/images/elixir_splash_bottles_1782555361775.jpg"
                  alt="Two premium Elixir water bottles side-by-side with crisp water splashing dynamically on a clean background"
                  className="object-cover w-full h-full hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
