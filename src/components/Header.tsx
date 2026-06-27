import { motion } from 'motion/react';
import { Infinity as InfinityIcon, Droplet, ShoppingCart, Activity, HelpCircle, Award } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
}

export default function Header({ cart, onOpenCart, activeSection }: HeaderProps) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'Discover Elixir', href: '#discover', icon: Droplet },
    { label: 'Intake Calculator', href: '#calculator', icon: Activity },
    { label: 'Impact Tracker', href: '#impact', icon: HelpCircle },
    { label: 'Our Certifications', href: '#certifications', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#020617]/95 backdrop-blur-md border-b-2 border-cyan-500/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="p-2 bg-[#020813] border-2 border-cyan-500/50 rounded-none text-cyan-400 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.3)]"
            >
              <InfinityIcon className="w-5 h-5 stroke-[3px]" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-tighter text-white uppercase leading-none group-hover:text-cyan-400 transition-colors">
                ELIXIR
              </span>
              <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-400 uppercase mt-0.5">
                BEVERAGES
              </span>
            </div>
          </a>

          {/* Navigation Anchors */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-1.5 font-sans text-sm font-bold tracking-wide uppercase transition-colors py-1 relative ${
                    isActive ? 'text-cyan-400' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 opacity-80" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Cart Actions */}
          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/916297480798?text=Hello%20Elixir%20Beverages!%20I%20have%20an%20inquiry%20or%20would%20like%20to%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-[14px] transition-all flex items-center justify-center cursor-pointer"
              id="whatsapp-header-button"
              title="Chat with Us on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.03-5.124-2.903-6.999-1.872-1.875-4.36-2.907-7.011-2.908-5.44 0-9.866 4.414-9.869 9.865-.001 1.77.476 3.498 1.38 5.044L1.761 21.3l5.09-1.334-.204-.112zm11.39-7.143c-.302-.151-1.785-.882-2.057-.981-.273-.099-.471-.149-.669.149-.198.298-.768.981-.941 1.179-.173.198-.347.223-.649.072-.302-.151-1.272-.469-2.424-1.496-.896-.8-1.5-1.787-1.275-2.203.226-.37.042-.57-.143-.755-.166-.165-.367-.428-.55-.642-.184-.214-.246-.367-.367-.611-.122-.245-.061-.459-.03-.611.031-.151.273-.611.372-.809.099-.198.198-.421.149-.611-.049-.19-.471-1.129-.646-1.55-.17-.41-.358-.354-.49-.36-.12-.006-.258-.007-.396-.007-.138 0-.362.052-.551.258-.189.206-.723.707-.723 1.724 0 1.017.74 2.002.843 2.141.103.138 1.456 2.222 3.527 3.116.493.213.877.34 1.177.435.496.158.948.135 1.305.082.399-.059 1.785-.73 2.039-1.436.254-.707.254-1.314.178-1.436-.076-.122-.272-.198-.574-.349z"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </header>
  );
}
