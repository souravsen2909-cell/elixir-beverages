import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export default function Certifications() {
  const certificates = [
    { id: 'iso-22000', src: '/src/assets/images/iso_22000_certified_1782570937152.jpg', alt: 'ISO 22000 Certified' },
    { id: 'haccp', src: '/src/assets/images/haccp_certified_1782570958323.jpg', alt: 'HACCP Certified' },
    { id: 'gmp', src: '/src/assets/images/gmp_certified_1782570973305.jpg', alt: 'GMP Certified' },
    { id: 'fssai', src: '/src/assets/images/fssai_logo_1782570989153.jpg', alt: 'FSSAI Licensed' },
    { id: 'iso-9001', src: '/src/assets/images/iso_9001_certified_1782571002124.jpg', alt: 'ISO 9001 Certified' },
    { id: 'isi', src: '/src/assets/images/isi_mark_1782571016522.jpg', alt: 'ISI Mark IS 14543' }
  ];

  return (
    <section id="certifications" className="py-20 bg-[#020617] border-b-2 border-cyan-500/20 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Simple Section Title */}
        <div className="flex flex-col items-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border-2 border-cyan-500/50 text-white rounded-none font-mono text-[10px] uppercase tracking-widest font-black mb-4 shadow-[2px_2px_0px_0px_rgba(6,182,212,0.4)]">
            <Award className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> Quality Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">
            Our Certifications
          </h2>
        </div>

        {/* Clean Grid of Certification Images with absolutely no other text */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-950 border-2 border-cyan-500/30 p-4 flex items-center justify-center aspect-square shadow-[4px_4px_0px_0px_rgba(6,182,212,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(14,165,233,0.5)] hover:border-cyan-400 transition-all duration-200"
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="max-w-full max-h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
