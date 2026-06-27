import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Thermometer, Weight, Plus, GlassWater, Trophy, RefreshCw, Sparkles, Eye } from 'lucide-react';
import { products } from '../data';

export default function Calculator() {
  const [weight, setWeight] = useState<number>(70); // in kg
  const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'athlete'>('moderate');
  const [climate, setClimate] = useState<'cool' | 'humid' | 'dry'>('humid');
  const [consumed, setConsumed] = useState<number>(0); // in ml
  const [isAnatomyOpen, setIsAnatomyOpen] = useState<boolean>(false);

  // Calculate standard formula: (Weight in kg * 35ml) + Activity add-on + Climate add-on
  let baseTarget = weight * 35; // base fluid ml
  
  if (activity === 'moderate') baseTarget += 500;
  if (activity === 'athlete') baseTarget += 1200;

  if (climate === 'humid') baseTarget += 300;
  if (climate === 'dry') baseTarget += 600;

  const targetLiters = (baseTarget / 1000).toFixed(1);
  const percentage = Math.min(100, Math.round((consumed / baseTarget) * 100));

  // Determine ideal Elixir recommendation
  const getRecommendation = () => {
    if (activity === 'athlete' || climate === 'dry') {
      return products[0]; // Premium Alkaline Water
    }
    return products[1]; // Everyday Alkaline Water
  };

  const recommendedProduct = getRecommendation();

  const handleAddWater = (amount: number) => {
    setConsumed((prev) => prev + amount);
  };

  const handleReset = () => {
    setConsumed(0);
  };

  return (
    <section id="calculator" className="py-24 bg-water-gradient border-b-2 border-black relative overflow-hidden">
      {/* Decorative background grid and shapes */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      {/* Watery ambient glowing orbs */}
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none animate-water-float" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-sky-200/25 rounded-full blur-3xl pointer-events-none animate-water-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border-2 border-cyan-500/50 text-white rounded-none font-mono text-[10px] uppercase tracking-widest font-black mb-4 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]">
            <Activity className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> Hydration Intelligence
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase leading-none">
            Calculate Your Daily <br />
            <span className="font-serif font-normal italic text-cyan-400 lowercase normal-case">Biological Fluid Needs</span>
          </h2>
          <p className="mt-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed font-medium">
            Metabolic water balance governs cognitive sharpness, muscle endurance, and cellular flushing. Discover your exact daily water intake blueprint.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          
          {/* LEFT: Parameters Form */}
          <div className="lg:col-span-4 bg-slate-950 border-2 border-cyan-500/40 rounded-none p-6 sm:p-8 flex flex-col justify-between text-left shadow-[6px_6px_0px_0px_rgba(6,182,212,0.4)] hover:shadow-[8px_8px_0px_0px_rgba(14,165,233,0.6)] transition-all duration-300">
            <div className="space-y-6">
              <h3 className="font-display font-black text-white text-xl uppercase tracking-tight">Your Profile</h3>
              
              {/* 1. Body Weight */}
              <div>
                <label className="font-mono text-[10px] font-black text-neutral-300 uppercase tracking-widest block mb-2 flex items-center justify-between">
                  <span>BODY WEIGHT (KG)</span>
                  <span className="font-sans font-black text-cyan-400 text-xs">{weight} kg ({Math.round(weight * 2.204)} lbs)</span>
                </label>
                <div className="flex items-center gap-4">
                  <Weight className="w-5 h-5 text-cyan-400" />
                  <input
                    type="range"
                    min={40}
                    max={120}
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-none cursor-pointer border border-cyan-500/30"
                  />
                </div>
              </div>

              {/* 2. Activity Level */}
              <div>
                <label className="font-mono text-[10px] font-black text-neutral-300 uppercase tracking-widest block mb-2">
                  DAILY EXERCISE ACTIVITY
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sedentary', 'moderate', 'athlete'] as const).map((act) => (
                    <button
                      key={act}
                      onClick={() => setActivity(act)}
                      className={`py-2.5 px-2 rounded-none text-[11px] font-black font-mono tracking-wider uppercase border-2 cursor-pointer transition-all ${
                        activity === act
                          ? 'border-cyan-400 bg-cyan-500 text-slate-950 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.5)]'
                          : 'border-cyan-500/30 bg-slate-900 text-neutral-300 hover:bg-slate-800'
                      }`}
                    >
                      {act === 'sedentary' ? 'Low' : act === 'moderate' ? 'Mod' : 'Pro'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Climate Factor */}
              <div>
                <label className="font-mono text-[10px] font-black text-neutral-300 uppercase tracking-widest block mb-2">
                  REGIONAL CLIMATE TEMP
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['cool', 'humid', 'dry'] as const).map((clm) => (
                    <button
                      key={clm}
                      onClick={() => setClimate(clm)}
                      className={`py-2.5 px-2 rounded-none text-[11px] font-black font-mono tracking-wider uppercase border-2 cursor-pointer transition-all ${
                        climate === clm
                          ? 'border-cyan-400 bg-cyan-500 text-slate-950 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.5)]'
                          : 'border-cyan-500/30 bg-slate-900 text-neutral-300 hover:bg-slate-800'
                      }`}
                    >
                      {clm === 'cool' ? '❄️ Cool' : clm === 'humid' ? '💧 Humid' : '☀️ Dry'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Target Output Summary */}
            <div className="mt-8 pt-6 border-t-2 border-cyan-500/20">
              <span className="font-mono text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">SUGGESTED DAILY VOLUME</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display text-4xl font-black text-white tracking-tight">{targetLiters}</span>
                <span className="font-display text-xl font-bold text-cyan-400 uppercase ml-1">Liters</span>
                <span className="text-xs text-neutral-400 font-mono font-bold uppercase ml-2 block">
                  (~{Math.round(baseTarget / 250)} glasses)
                </span>
              </div>
            </div>
          </div>

          {/* MIDDLE: Realtime Wave Completion Simulator */}
          <div className="lg:col-span-4 bg-slate-950 text-white rounded-none p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden text-center min-h-[400px] border-2 border-cyan-500/40 shadow-[6px_6px_0px_0px_rgba(6,182,212,0.4)] hover:shadow-[8px_8px_0px_0px_rgba(14,165,233,0.6)] transition-all duration-300">
            
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            {/* Fluid Wave Box (Brutalist Style) */}
            <div className="flex flex-col items-center justify-center flex-1 my-4 z-10 w-full">
              <div className="relative w-full max-w-[200px] aspect-square rounded-none border-4 border-cyan-500/40 bg-slate-900 flex items-center justify-center overflow-hidden shadow-[4px_4px_0px_0px_rgba(6,182,212,0.3)]">
                
                {/* Simulated Water Wave Fill level */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 right-0 bg-cyan-500 transition-all duration-300"
                />

                {/* Progress Text overlay */}
                <div className="relative z-20 flex flex-col items-center p-4 bg-slate-950/80 backdrop-blur-xs border-2 border-cyan-400 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="font-mono text-[9px] font-black tracking-widest uppercase text-white">
                    HYDRATED
                  </span>
                  <span className="font-display text-3xl font-black tracking-tighter text-cyan-300">
                    {percentage}%
                  </span>
                  <span className="font-mono text-[9px] font-bold text-neutral-300 mt-1">
                    {consumed}/{baseTarget}ml
                  </span>
                </div>
              </div>
            </div>

            {/* Hydration addition actions */}
            <div className="w-full z-10 mt-4">
              <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-widest block mb-2.5">TAP TO LOG HYDRATION</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleAddWater(250)}
                  className="py-2.5 px-1 bg-slate-900 border-2 border-cyan-500/40 text-white hover:bg-slate-800 active:translate-y-0.5 rounded-none text-xs font-black font-mono tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]"
                >
                  <GlassWater className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  +250ml
                </button>
                <button
                  onClick={() => handleAddWater(500)}
                  className="py-2.5 px-1 bg-slate-900 border-2 border-cyan-500/40 text-white hover:bg-slate-800 active:translate-y-0.5 rounded-none text-xs font-black font-mono tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]"
                >
                  <GlassWater className="w-4.5 h-4.5 text-black fill-cyan-400" />
                  +500ml
                </button>
                <button
                  onClick={() => handleAddWater(1000)}
                  className="py-2.5 px-1 bg-slate-900 border-2 border-cyan-500/40 text-white hover:bg-slate-800 active:translate-y-0.5 rounded-none text-xs font-black font-mono tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]"
                >
                  <GlassWater className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                  +1.0L
                </button>
              </div>

              {percentage >= 100 ? (
                <div className="mt-4 py-2 bg-emerald-500 border-2 border-emerald-600 text-slate-950 rounded-none flex items-center justify-center gap-1.5 font-bold animate-pulse shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
                  <Trophy className="w-4 h-4 text-slate-950" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider">Goal achieved today!</span>
                </div>
              ) : (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-neutral-400 hover:text-white transition-colors uppercase cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Clear log
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Personalized Blend Recommendation */}
          <div className="lg:col-span-4 bg-slate-950 border-2 border-cyan-500/40 rounded-none p-6 sm:p-8 flex flex-col justify-between text-left shadow-[6px_6px_0px_0px_rgba(6,182,212,0.4)] hover:shadow-[8px_8px_0px_0px_rgba(14,165,233,0.6)] transition-all duration-300">
            <div>
              <span className="font-mono text-[9px] font-black text-slate-950 tracking-widest uppercase bg-cyan-400 border border-cyan-300 px-2.5 py-1 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)] block w-fit mb-4">
                IDEAL ELEMENTAL RECOMMENDATION
              </span>
              <h3 className="font-display font-black text-white text-lg uppercase tracking-tight">
                Your Metabolic Companion
              </h3>
              <p className="text-xs text-neutral-400 font-medium mt-1.5 leading-relaxed">
                Based on your physiological weight and physical workout factors, your cells require exact mineral saturation properties.
              </p>

              {/* Recommended Product Box */}
              <button
                onClick={() => setIsAnatomyOpen(true)}
                className="w-full mt-6 p-4 bg-slate-900 border-2 border-cyan-500/30 rounded-none flex gap-4 shadow-[3px_3px_0px_0px_rgba(6,182,212,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(6,182,212,0.5)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer group text-left"
              >
                <div className="w-20 h-20 rounded-none border border-cyan-500/30 overflow-hidden bg-slate-950 flex-shrink-0 relative">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="font-mono text-[9px] font-black text-cyan-400 uppercase flex items-center gap-1">
                    Recommended <Sparkles className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400" />
                  </span>
                  <h4 className="font-display font-black text-sm text-white uppercase truncate group-hover:text-cyan-400 transition-colors">{recommendedProduct.name}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 font-mono font-bold flex items-center justify-between">
                    <span>pH Balance {recommendedProduct.ph}</span>
                    <span className="text-[9px] text-cyan-400 font-black uppercase tracking-wider group-hover:underline">View Anatomy →</span>
                  </p>
                </div>
              </button>

              {/* Diagnostic benefits list */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-sm">⚡</span>
                  <p className="text-neutral-300 font-medium leading-relaxed">
                    <strong>Absorbability:</strong> Micro-structured minerals support faster gastrointestinal transit.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-sm">🧪</span>
                  <p className="text-neutral-300 font-medium leading-relaxed">
                    <strong>Optimal pH:</strong> Maintains systemic alkalinity to counteract metabolic oxidation during focus states.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-cyan-500/20">
              <button
                onClick={() => setIsAnatomyOpen(true)}
                className="w-full inline-flex items-center justify-center py-3 bg-cyan-500 text-slate-950 font-display text-xs font-black uppercase tracking-wider rounded-none border-2 border-cyan-400 shadow-[3px_3px_0px_0px_rgba(6,182,212,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(6,182,212,0.6)] active:translate-y-0.5 transition-all cursor-pointer font-bold"
              >
                🔬 View Product Anatomy
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Formulation Anatomy Modal */}
      <AnimatePresence>
        {isAnatomyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-slate-950 border-4 border-cyan-500 p-6 sm:p-8 md:p-12 max-w-5xl w-full relative shadow-[10px_10px_0px_0px_rgba(6,182,212,0.4)] overflow-y-auto max-h-[90vh] text-left"
            >
              <button
                onClick={() => setIsAnatomyOpen(false)}
                className="absolute top-4 right-4 font-mono font-black text-xl text-neutral-400 hover:text-cyan-400 cursor-pointer"
                aria-label="Close Anatomy Visualizer"
              >
                ✕
              </button>

              <div className="mb-8 border-b-2 border-dashed border-cyan-500/20 pb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-cyan-500/30 text-white rounded-none font-mono text-[9px] uppercase tracking-widest font-black mb-3">
                  <Sparkles className="w-3 h-3 text-cyan-400 fill-cyan-400" /> Interactive Formulation Anatomy
                </span>
                <h3 className="font-display font-black text-3xl text-white uppercase tracking-tight leading-none">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider font-mono mt-1">
                  {recommendedProduct.tagline} • pH Balance {recommendedProduct.ph}
                </p>
              </div>

              {/* Responsive Anatomy Layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center">
                
                {/* Left Attributes Column */}
                <div className="md:col-span-4 flex flex-col gap-6 md:gap-12 text-left md:text-right">
                  {/* Attribute 1 */}
                  <div className="p-4 bg-slate-900 border-2 border-cyan-500/30 rounded-none shadow-[3px_3px_0px_0px_rgba(6,182,212,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(6,182,212,0.4)] transition-all">
                    <span className="font-mono text-[9px] font-black text-cyan-400 uppercase tracking-widest block mb-1">Benefit 01</span>
                    <h4 className="font-display font-black text-white text-xs md:text-sm uppercase tracking-tight">
                      {recommendedProduct.attributes[0].label}
                    </h4>
                    <p className="text-[10px] md:text-xs text-neutral-300 font-medium mt-1 leading-relaxed">
                      {recommendedProduct.attributes[0].value}
                    </p>
                  </div>

                  {/* Attribute 3 */}
                  <div className="p-4 bg-slate-900 border-2 border-cyan-500/30 rounded-none shadow-[3px_3px_0px_0px_rgba(6,182,212,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(6,182,212,0.4)] transition-all">
                    <span className="font-mono text-[9px] font-black text-cyan-400 uppercase tracking-widest block mb-1">Benefit 02</span>
                    <h4 className="font-display font-black text-white text-xs md:text-sm uppercase tracking-tight">
                      {recommendedProduct.attributes[2].label}
                    </h4>
                    <p className="text-[10px] md:text-xs text-neutral-300 font-medium mt-1 leading-relaxed">
                      {recommendedProduct.attributes[2].value}
                    </p>
                  </div>
                </div>

                {/* Center Image Container */}
                <div className="md:col-span-4 flex justify-center py-6 bg-slate-900 border-2 border-cyan-500/30 shadow-[4px_4px_0px_0px_rgba(6,182,212,0.3)] relative aspect-[3/4] max-w-[280px] mx-auto w-full group overflow-hidden">
                  <motion.img
                    animate={{ rotate: [0, 0.5, -0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="h-full object-contain drop-shadow-2xl select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Waterline or overlay */}
                  <span className="absolute bottom-2 font-mono text-[8px] text-cyan-400 font-black uppercase tracking-widest bg-slate-950 border border-cyan-500/30 px-1.5 py-0.5">
                    Premium Botanical Vessel
                  </span>
                </div>

                {/* Right Attributes Column */}
                <div className="md:col-span-4 flex flex-col gap-6 md:gap-12 text-left">
                  {/* Attribute 2 */}
                  <div className="p-4 bg-slate-900 border-2 border-cyan-500/30 rounded-none shadow-[3px_3px_0px_0px_rgba(6,182,212,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(6,182,212,0.4)] transition-all">
                    <span className="font-mono text-[9px] font-black text-cyan-400 uppercase tracking-widest block mb-1">Benefit 03</span>
                    <h4 className="font-display font-black text-white text-xs md:text-sm uppercase tracking-tight">
                      {recommendedProduct.attributes[1].label}
                    </h4>
                    <p className="text-[10px] md:text-xs text-neutral-300 font-medium mt-1 leading-relaxed">
                      {recommendedProduct.attributes[1].value}
                    </p>
                  </div>

                  {/* Attribute 4 */}
                  <div className="p-4 bg-slate-900 border-2 border-cyan-500/30 rounded-none shadow-[3px_3px_0px_0px_rgba(6,182,212,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(6,182,212,0.4)] transition-all">
                    <span className="font-mono text-[9px] font-black text-cyan-400 uppercase tracking-widest block mb-1">Benefit 04</span>
                    <h4 className="font-display font-black text-white text-xs md:text-sm uppercase tracking-tight">
                      {recommendedProduct.attributes[3].label}
                    </h4>
                    <p className="text-[10px] md:text-xs text-neutral-300 font-medium mt-1 leading-relaxed">
                      {recommendedProduct.attributes[3].value}
                    </p>
                  </div>
                </div>

              </div>

              {/* Info panel */}
              <div className="mt-8 pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400 font-medium">
                  🧪 Formula standard verified under clinical specifications. 100% active, pure bio-available ingredients.
                </div>
                <button
                  onClick={() => setIsAnatomyOpen(false)}
                  className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-display text-xs font-black uppercase tracking-wider rounded-none border-2 border-cyan-400 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(6,182,212,0.5)] active:translate-y-0.5 transition-all cursor-pointer font-bold"
                >
                  Return to Lab
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
