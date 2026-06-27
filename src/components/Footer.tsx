import { Infinity as InfinityIcon, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-10 border-t-2 border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b-2 border-cyan-500/10">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-slate-900 rounded-none text-cyan-400 border-2 border-cyan-500/30 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.3)]">
                <InfinityIcon className="w-5 h-5 stroke-[3px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-black tracking-widest text-white uppercase">
                  ELIXIR
                </span>
                <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase -mt-1 font-bold">
                  BEVERAGES
                </span>
              </div>
            </div>
            
            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm font-medium">
              Artisanal, mineral-rich, and pristine water crafted for perfect hydration. Designed to sustain hydration luxury and planetary zero-waste stewardship.
            </p>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-widest font-black">NAVIGATION</h5>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-tight">
              <li>
                <a href="#discover" className="text-neutral-400 hover:text-cyan-400 transition-colors">
                  Discover Elixir
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-neutral-400 hover:text-cyan-400 transition-colors">
                  Target Calculator
                </a>
              </li>
              <li>
                <a href="#certifications" className="text-neutral-400 hover:text-cyan-400 transition-colors">
                  Our Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Contact Col */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-mono text-[10px] text-white uppercase tracking-widest font-black">GET IN TOUCH</h5>
            <ul className="space-y-2 text-xs text-neutral-400 font-bold uppercase tracking-tight">
              <li>
                Email:{' '}
                <a href="mailto:future@beveragesbyelixir.com" className="text-neutral-300 hover:text-cyan-400 hover:underline transition-colors">
                  future@beveragesbyelixir.com
                </a>
              </li>
              <li>
                WhatsApp / Call:{' '}
                <a
                  href="https://wa.me/916297480798?text=Hello%20Elixir%20Beverages!%20I%20have%20an%20inquiry%20or%20would%20like%20to%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-black block"
                >
                  +91 62974 80798
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="text-[10px] text-neutral-500 font-mono tracking-wider font-black uppercase">
              © {new Date().getFullYear()} ELIXIR BEVERAGES INC. ALL RIGHTS RESERVED.
            </p>
            <span className="hidden sm:inline text-[10px] text-neutral-700 font-mono">|</span>
            <a
              href="https://sip-style.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono tracking-wider font-black uppercase hover:underline transition-all"
            >
              MADE BY SIP STYLE
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/elixirbeveragesindia?igsh=ZHF2Z2sweWF2YThk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 border-2 border-cyan-500/30 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(14,165,233,0.5)] transition-all"
              title="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
