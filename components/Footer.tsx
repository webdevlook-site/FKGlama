import React from 'react';
import { Facebook, Twitter, Instagram, Shield, MapPin, Mail, ShoppingBag, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 pt-16 pb-8 border-t border-stone-800 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-stone-900/50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16">
            {/* Left: Brand Identity */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Shield className="h-10 w-10 text-glama-primary fill-stone-950" />
                    <div>
                        <h2 className="font-display font-bold text-3xl text-white leading-none uppercase">FK Glama</h2>
                        <span className="text-xs text-stone-500 uppercase tracking-[0.2em]">Est. 1952</span>
                    </div>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                    Representing the spirit of the hill. We are a community-driven club dedicated to football excellence and developing the next generation of talent in Bela Palanka.
                </p>
                <div className="flex gap-3">
                    {[Facebook, Twitter, Instagram].map((Icon, i) => (
                        <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-stone-900 text-stone-400 border border-stone-800 hover:bg-glama-primary hover:text-white hover:border-glama-primary transition-all duration-300">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Right: Actions & Info */}
            <div className="flex flex-col md:items-end justify-between space-y-8">
                {/* Navigation Links */}
                <nav className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
                    {['Squad', 'Matches', 'Club'].map((item) => (
                        <a key={item} href={`#/${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-stone-300 hover:text-glama-primary transition-colors">
                            {item}
                        </a>
                    ))}
                    <a href="#/academy" className="text-sm font-bold uppercase tracking-widest text-stone-300 hover:text-glama-primary transition-colors">Academy</a>
                </nav>

                {/* Store CTA */}
                <a href="#" className="group inline-flex items-center gap-3 bg-stone-100 text-stone-950 px-6 py-3 rounded-xl font-bold uppercase tracking-wide hover:bg-glama-primary hover:text-white transition-all duration-300 shadow-xl">
                    <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                    <span>Visit Official Store</span>
                    <ArrowRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </a>

                {/* Contact Minimal */}
                <div className="flex flex-col md:items-end gap-2 text-xs text-stone-500 font-medium">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-glama-primary" />
                        <span>Glama Hill Arena, Bela Palanka, Serbia</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={14} className="text-glama-primary" />
                        <span>contact@fkglama.rs</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-stone-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-600 uppercase tracking-wider font-bold">
            <p>&copy; {new Date().getFullYear()} FK Glama. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-stone-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-stone-400 transition-colors">Cookies</a>
            </div>
        </div>
      </div>
    </footer>
  );
};