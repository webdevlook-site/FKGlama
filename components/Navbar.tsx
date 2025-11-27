import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
      onNavigate(id);
      setIsMobileMenuOpen(false);
  }

  const handleLogoClick = () => {
      onNavigate('home');
  }

  // Determine if we should show the "Floating Island" style
  // We trigger this either on scroll OR if the mobile menu is open (to provide a background for the links)
  const showIsland = isScrolled || isMobileMenuOpen;

  return (
    <nav 
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border ${
        showIsland 
          ? 'top-4 left-4 right-4 md:left-8 md:right-8 max-w-7xl mx-auto rounded-2xl bg-stone-900/90 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
          : 'top-0 left-0 right-0 bg-transparent py-6 border-transparent shadow-none'
      }`}
    >
      <div className={`mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-500 ${showIsland ? 'py-3' : 'max-w-7xl'}`}>
        {/* Logo */}
        <div 
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <Shield className={`h-10 w-10 text-glama-primary fill-stone-950 transition-transform duration-300 ${showIsland ? 'scale-90' : 'scale-100'}`} />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-wider text-white uppercase leading-none">
              FK Glama
            </h1>
            <p className={`text-[10px] uppercase tracking-widest transition-colors ${showIsland ? 'text-stone-400' : 'text-glama-light'}`}>Est. 1952</p>
          </div>
        </div>

        {/* Desktop Menu - Changed breakpoint to lg for tablet support */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group overflow-hidden ${
                currentPage === link.id 
                  ? 'text-white bg-white/10' 
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              {currentPage === link.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-glama-primary rounded-full opacity-0"></span>
              )}
            </button>
          ))}
          <div className="ml-6 pl-6 border-l border-white/10">
            <button className={`bg-glama-primary text-white rounded-full font-display font-bold text-lg uppercase hover:bg-glama-light hover:text-glama-dark transition-all duration-300 shadow-lg shadow-glama-primary/20 hover:shadow-glama-primary/40 ${showIsland ? 'px-6 py-1.5 text-base' : 'px-8 py-2.5'}`}>
                Tickets
            </button>
          </div>
        </div>

        {/* Mobile Toggle - Changed breakpoint to lg for tablet support */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`text-white p-2 rounded-full transition-colors ${showIsland ? 'hover:bg-white/10' : 'hover:bg-black/20'}`}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Changed breakpoint to lg for tablet support */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 space-y-2 flex flex-col items-center border-t border-white/5 pt-6 mx-4">
             {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full py-3 text-center rounded-xl text-lg font-display font-bold uppercase tracking-widest transition-colors ${
                currentPage === link.id ? 'bg-glama-primary/20 text-glama-primary' : 'text-stone-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
           <button className="mt-4 bg-glama-primary text-white w-full py-3 rounded-xl font-display font-bold text-lg uppercase hover:bg-glama-light transition-colors shadow-lg">
            Buy Tickets
          </button>
        </div>
      </div>
    </nav>
  );
};

const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Squad', id: 'squad' },
    { name: 'Matches', id: 'matches' },
    { name: 'Academy', id: 'academy' },
    { name: 'Club', id: 'club' },
];